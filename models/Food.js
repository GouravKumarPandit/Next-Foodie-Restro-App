import mongoose from "mongoose";
import slugify from "slugify";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength: 50,
        },

        slug: {
            type: String,
            trim: true,
            maxlength: 100,
            unique: true,
            lowercase: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 250,
        },

        image: {
            type: String,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        discountPrice: {
            type: Number,
            min: 0,
            default: 0,
        },

        isVeg: {
            type: Boolean,
            default: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        preparationTime: {
            type: Number,
            min: 0,
            default: 0,
        },

        ingredients: {
            type: [String],
            default: [],
        },

        servingSize: {
            type: String,
            trim: true,
            maxlength: 50,
        },

        serves: {
            type: Number,
            min: 1,
            default: 1,
        },

        cuisine: {
            type: String,
            trim: true,
            maxlength: 50,
        },

        tags: {
            type: [String],
            default: [],
        },

        featured: {
            type: Boolean,
            default: false,
        },

        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },

        reviewCount: {
            type: Number,
            min: 0,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

foodSchema.pre("save", function(){
    if (this.name) {
        this.slug = slugify(this.name, { lower: true });
    }
});

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default Food;