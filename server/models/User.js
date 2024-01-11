import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema({
	lastName: {
		type: String,
		required: [true, "please provide name"],
		minLength: 2,
		maxLength: 40,
		trim: true
	},
	firstName: {
		type: String,
		required: [true, "please provide name"],
		minLength: 2,
		maxLength: 40,
		trim: true
	},
	email: {
		type: String,
		required: [true, "please provide email"],
		validate: {
			validator: validator.isEmail,
			message: (props) => `${props.value} is not a valid email. Please provide valid email`
		},
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: [true, "please provide password"],
		minLength: 6,
		maxLength: 25,
		select: false // hidden unless explicitly called
	},
	favorites: [{
		type: mongoose.Types.ObjectId,
		ref: "Workout"
	}],
	isAdmin: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	}
}, { timestamps: true });

// function to hash user entered password on new user creation before we save
// will be invoked on user everytime save() is called on this
UserSchema.pre("save", async function () {
	// can use this.modifiedPaths() to return all modified values on user.save()
	// if password was not modified, we can return from this function without
	// ...inadvertently hashing password again
	if (!this.isModified("password")) return;
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	} catch (error) {
		throw new Error("password hash failed");
	}
});

// function on user to compare entered password to user.password
UserSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		if (await bcrypt.compare(candidatePassword, this.password)) {
			return true;
		}
	} catch {
		throw new Error("invalid password");
	}
};

export default mongoose.model("User", UserSchema);