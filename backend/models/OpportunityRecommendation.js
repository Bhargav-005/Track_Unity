const mongoose = require('mongoose');

const opportunityRecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity',
      required: true,
      index: true,
    },
    eligible: {
      type: Boolean,
      default: false,
    },
    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
    matchedSkills: [{ type: String, trim: true }],
    missingSkills: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

opportunityRecommendationSchema.index({ userId: 1, opportunityId: 1 }, { unique: true });

module.exports = mongoose.model('OpportunityRecommendation', opportunityRecommendationSchema);