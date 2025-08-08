import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller Function to Manage Clerk User with database
export const clerkWebhook = async (req, res) => {
    try{
      
        //Create a Svix instance with clerk webhook secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        //Verify Headers
        await webhook.verify(
            JSON.stringify(req.body),
            {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            });

            //Getting data from request body
            const { data, type } = req.body;

            //Switch case for different events
            switch (type) {
            case "user.created": {
                // handle user.created event
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url ,
                    resume: ''
                }
                await User.create(userData);
                res.json({})
                break;
            }
            case "user.updated": {
                // handle user.updated event
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url ,
                
                }
                await User.findByIdAndUpdate(data.id, userData);
                res.json({})
                break;
            }
            case "user.deleted": {
                // handle user.deleted event
                await User.findByIdAndDelete(data.id);
                res.json({})
                break;
            }
            default: 
                break;
        }
    } catch (error) {
        // handle error
        console.log(error.message);
        res.json({success: false, message: 'webhooks error'});
    }
}