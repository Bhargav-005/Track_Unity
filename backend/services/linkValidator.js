const { URL } = require('url');

const axios = require('axios');

const BLACKLISTED_DOMAINS = new Set([
  'bit.ly',
  'tinyurl.com',
  'goo.gl',
  't.co',
]);

const normalizeUrl = (value) => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const validateOpportunityLink = async (inputUrl) => {
  const normalized = normalizeUrl(inputUrl);
  if (!normalized) {
    return { linkStatus: 'broken', normalizedUrl: null, reason: 'missing-url' };
  }

  let parsed;
  try {
    parsed = new URL(normalized);
  } catch (error) {
    return { linkStatus: 'broken', normalizedUrl: normalized, reason: 'invalid-url-format' };
  }

  const hostname = parsed.hostname.toLowerCase();
  if (BLACKLISTED_DOMAINS.has(hostname)) {
    return { linkStatus: 'suspicious', normalizedUrl: normalized, reason: 'blacklisted-domain' };
  }

  try {
    const response = await axios.get(normalized, {
      maxRedirects: 5,
      timeout: Number(process.env.LINK_VALIDATION_TIMEOUT_MS) || 5000,
      validateStatus: () => true,
    });

    if (response.status === 200 || response.status === 302) {
      return { linkStatus: 'valid', normalizedUrl: normalized, reason: `status-${response.status}` };
    }

    if (response.status >= 300 && response.status < 500) {
      return { linkStatus: 'suspicious', normalizedUrl: normalized, reason: `status-${response.status}` };
    }

    return { linkStatus: 'broken', normalizedUrl: normalized, reason: `status-${response.status}` };
  } catch (error) {
    return { linkStatus: 'broken', normalizedUrl: normalized, reason: 'request-failed' };
  }
};

module.exports = {
  validateOpportunityLink,
};
