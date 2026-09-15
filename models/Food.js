import mongoose from "mongoose";
import slugify from "slugify";

const foodSchema = new mongoose.Schema({
    name: {
        trim: true,
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    slug: {
        trim: true,
        type: String, 
        maxlength: 100,
        unique: true,
        lowercase: true
    },
    description: {
        trim: true,
        type: String,
        maxlength: 250
    },
    image: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    isVeg: {
        type: Boolean,
        default: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    preparationTime: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

foodSchema.pre("save", function(){
    if (this.name) {
        this.slug = slugify(this.name, { lower: true });
    }
});

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default Food;