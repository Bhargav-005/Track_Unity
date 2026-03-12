const validator = require('validator');

const Opportunity = require('../models/Opportunity');

const TRUSTED_DOMAINS = new Set([
  'google.com',
  'microsoft.com',
  'amazon.jobs',
  'linkedin.com',
]);

const SUSPICIOUS_KEYWORDS = [
  'pay registration fee',
  'guaranteed job',
  'limited seats',
  'pay training fee',
];

const normalizeHostname = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  if (!validator.isURL(normalized, { require_protocol: true })) {
    return null;
  }

  try {
    return new URL(normalized).hostname.replace(/^www\./i, '').toLowerCase();
  } catch (error) {
    return null;
  }
};

const isTrustedDomain = (hostname) => {
  if (!hostname) {
    return false;
  }

  if (TRUSTED_DOMAINS.has(hostname)) {
    return true;
  }

  return Array.from(TRUSTED_DOMAINS).some((domain) => hostname.endsWith(`.${domain}`));
};

const hasSuspiciousKeywords = (text = '') => {
  const lowered = String(text).toLowerCase();
  return SUSPICIOUS_KEYWORDS.some((keyword) => lowered.includes(keyword));
};

const detectDuplicateOpportunity = async ({ title, company, applicationLink }) => {
  const duplicateFilter = [];

  if (applicationLink) {
    duplicateFilter.push({ applicationLink });
  }

  if (title && company) {
    duplicateFilter.push({
      title: { $regex: `^${title}$`, $options: 'i' },
      company: { $regex: `^${company}$`, $options: 'i' },
    });
  }

  if (!duplicateFilter.length) {
    return false;
  }

  const existing = await Opportunity.findOne({ $or: duplicateFilter }).select('_id').lean();
  return Boolean(existing);
};

const assessOpportunityRisk = async ({ title, company, text, applicationLink }) => {
  const hostname = normalizeHostname(applicationLink);
  const validUrl = Boolean(hostname);
  const trustedDomain = isTrustedDomain(hostname);
  const suspiciousText = hasSuspiciousKeywords(text);
  const duplicate = await detectDuplicateOpportunity({ title, company, applicationLink });

  let riskLevel = 'low';
  let riskPoints = 0;

  if (applicationLink && !validUrl) {
    riskPoints += 2;
  }

  if (validUrl && !trustedDomain) {
    riskPoints += 1;
  }

  if (suspiciousText) {
    riskPoints += 2;
  }

  if (duplicate) {
    riskPoints += 1;
  }

  if (riskPoints >= 3) {
    riskLevel = 'high';
  } else if (riskPoints >= 1) {
    riskLevel = 'medium';
  }

  return {
    riskLevel,
    metadata: {
      validUrl,
      trustedDomain,
      suspiciousText,
      duplicate,
      hostname,
    },
  };
};

module.exports = {
  assessOpportunityRisk,
};