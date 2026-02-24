import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  duration: Number,
  isPreview: {
    type: Boolean,
    default: false,
  },
});

const moduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    thumbnail: String,
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    duration: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modules: [moduleSchema],
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
