const Opportunity = require('../models/Opportunity');
const UserProfile = require('../models/UserProfile');
const { calculateRecommendationMatch } = require('./nlpClientService');

const getUserRecommendations = async (userId, limit = 20) => {
  const profile = await UserProfile.findOne({ userId }).lean();
  if (!profile) {
    return [];
  }

  const opportunities = await Opportunity.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  const recommendationResults = await Promise.all(
    opportunities.map(async (opportunity) => {
      const result = await calculateRecommendationMatch({
        userProfile: {
          skills: profile.skills || [],
          careerDomain: profile.careerDomain || '',
          preferredRole: profile.preferredRole || '',
        },
        opportunity: {
          skills: opportunity.skills || [],
          eligibility: opportunity.eligibility || '',
          description: opportunity.description || '',
        },
      });

      return {
        opportunity,
        ...result,
      };
    })
  );

  return recommendationResults.sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0));
};

// Placeholder for future persisted caching / push notifications.
const updateRecommendationsForOpportunity = async () => Promise.resolve();

module.exports = {
  getUserRecommendations,
  updateRecommendationsForOpportunity,
};
