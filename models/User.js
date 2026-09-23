import mongoose from "mongoose";
import slugify from "slugify";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: 2,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    dialcode: {
        type: String,
        default: "91"
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15
    },
    role: {
        type: String,
        enum: ["admin", "customer", "staff"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("validate", async function () {
    if (!this.isNew && this.username) return;

    if (this.first_name && this.last_name) {
        const baseUsername = slugify(`${this.first_name} ${this.last_name}`, {
            lower: true,
            strict: true,
        });

        let username = baseUsername;
        let suffix = 1;

        while (await this.constructor.findOne({ username })) {
            const tag = `-${suffix}`;
            username = `${baseUsername.slice(0, 30 - tag.length)}${tag}`;
            suffix += 1;
        }

        this.username = username;
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
