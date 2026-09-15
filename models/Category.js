import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
    name: {
        trim: true,
        type: String,
        required: true,
        maxlength: 25
    },
    slug: {
        trim: true,
        type: String,
        maxlength: 50,
        unique: true,
        lowercase: true
    },
    parentCat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    description: {
        trim: true,
        type: String,
        maxlength: 250
    },
    image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

categorySchema.pre("save", function () {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true });
    }
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;