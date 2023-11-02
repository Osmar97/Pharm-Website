import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://osmargraca:Osmar.97@cluster0.xivna1a.mongodb.net/";

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("farmaDB connected successfully!"))
    .catch((err) =>
      console.log("Getting error from DB connection ${err.message}")
    );
};

export default connectToDB;
