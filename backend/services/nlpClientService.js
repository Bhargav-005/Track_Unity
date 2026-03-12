const axios = require('axios');

const NLP_SERVICE_URL = process.env.NLP_SERVICE_URL || 'http://localhost:8000';

const fallbackExtraction = (text) => ({
  title: 'Opportunity',
  company: 'Unknown Company',
  role: null,
  deadline: null,
  eligibility: null,
  skills: [],
  applicationLink: null,
  description: text || '',
  confidenceScore: 0,
});

const extractOpportunityWithNlp = async (text) => {
  if (!text || typeof text !== 'string') {
    return fallbackExtraction('');
  }

  try {
    const response = await axios.post(
      `${NLP_SERVICE_URL}/extract`,
      { text },
      { timeout: Number(process.env.NLP_SERVICE_TIMEOUT_MS) || 8000 }
    );

    return {
      ...fallbackExtraction(text),
      ...(response.data || {}),
      description: (response.data && response.data.description) || text,
    };
  } catch (error) {
    return fallbackExtraction(text);
  }
};

const calculateRecommendationMatch = async ({ userProfile, opportunity }) => {
  try {
    const response = await axios.post(
      `${NLP_SERVICE_URL}/recommend-match`,
      {
        userProfile,
        opportunity,
      },
      { timeout: Number(process.env.NLP_SERVICE_TIMEOUT_MS) || 8000 }
    );

    return response.data;
  } catch (error) {
    const userSkills = (userProfile?.skills || []).map((skill) => String(skill).toLowerCase());
    const opportunitySkills = (opportunity?.skills || []).map((skill) => String(skill).toLowerCase());

    const matchedSkills = opportunitySkills.filter((skill) => userSkills.includes(skill));
    const missingSkills = opportunitySkills.filter((skill) => !userSkills.includes(skill));

    return {
      eligible: matchedSkills.length > 0,
      matchedSkills,
      missingSkills,
      similarityScore: 0,
    };
  }
};

module.exports = {
  extractOpportunityWithNlp,
  calculateRecommendationMatch,
};
