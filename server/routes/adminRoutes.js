const express = require("express");
const User = require("../models/User");
const Analysis = require("../models/Analysis");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   ADMIN DASHBOARD STATS
========================= */

router.get(
  "/stats",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      // Count every non-admin user as a student.
      // This also includes older users that may not
      // have a role field yet.
      const totalStudents =
        await User.countDocuments({
          role: { $ne: "admin" },
        });

      const totalAnalyses =
        await Analysis.countDocuments();

      const averageResult =
        await Analysis.aggregate([
          {
            $group: {
              _id: null,
              averageScore: {
                $avg: "$finalScore",
              },
            },
          },
        ]);

      const averageReadiness =
        averageResult.length > 0
          ? Math.round(
              averageResult[0].averageScore
            )
          : 0;

      const careerBreakdown =
        await Analysis.aggregate([
          {
            $group: {
              _id: "$career",
              count: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              count: -1,
            },
          },
        ]);

      const recentAnalyses =
        await Analysis.find()
          .populate(
            "userId",
            "name email role"
          )
          .sort({
            createdAt: -1,
          })
          .limit(10);

      res.status(200).json({
        message:
          "Admin statistics fetched successfully",

        stats: {
          totalStudents,
          totalAnalyses,
          averageReadiness,
          careerBreakdown,
          recentAnalyses,
        },
      });
    } catch (error) {
      console.log(
        "Admin Stats Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching admin statistics",
      });
    }
  }
);

/* =========================
   GET ALL STUDENTS
========================= */

router.get(
  "/students",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      // Fetch every user first
      const allUsers = await User.find({})
        .select("-password")
        .sort({
          createdAt: -1,
        });

      // Exclude only admin accounts
      const students = allUsers.filter(
        (user) => user.role !== "admin"
      );

      // Add number of saved analyses
      // for every student
      const studentsWithAnalysis =
        await Promise.all(
          students.map(async (student) => {
            const analysisCount =
              await Analysis.countDocuments({
                userId: student._id,
              });

            return {
              ...student.toObject(),
              analysisCount,
            };
          })
        );

      res.status(200).json({
        message:
          "Students fetched successfully",

        totalUsers: allUsers.length,
        totalStudents:
          studentsWithAnalysis.length,

        students: studentsWithAnalysis,
      });
    } catch (error) {
      console.log(
        "Students Fetch Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching students",
      });
    }
  }
);

module.exports = router;