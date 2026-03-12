const { getUserRecommendations } = require('../services/recommendationService');

// @desc    Get recommendations for logged-in user
// @route   GET /api/recommendations
// @access  Private
const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await getUserRecommendations(req.user._id);
    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
};
