const mongoose = require("mongoose");

const connectionRequest = mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: `{VALUES} is invalid`,
            }
        }
    },
    {
        timestamps: true,
    }
)

connectionRequest.index({fromUserId: 1, toUserId: 1})

connectionRequest.pre("save", function (next) {
    // you can do any validation and this function runs on evert database save
    const connectionReq = this;
    if(connectionReq.fromUserId.equals(connectionReq.toUserId)){
        throw new Error("You cannot send connection request to yourself");
    }
    next();
})

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequest);

module.exports = ConnectionRequestModel;

