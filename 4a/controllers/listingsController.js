const Listings = require("../models/listingsModel");
const User = require("../models/userModel");

exports.getCreateListingsForm = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.render("pages/login.ejs", {
      error: "No User found. Login Again",
    });
  }

  return res.render("pages/listingsForm.ejs", {
    user: user,
  });
};

exports.createListings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "No User found. Login Again",
      });
    }

    const { title, description, imageUrl, price, location, country } = req.body;

    if (
      !title ||
      !description ||
      !imageUrl ||
      !price ||
      !location ||
      !country
    ) {
      return res.render("pages/listingsForm.ejs", {
        error: "Please fill in all the required fields",
      });
    }

    const listings = await Listings.create({
      title,
      description,
      imageUrl,
      price,
      location,
      country,
      owner: userId,
    });

    console.log(listings);
    res.redirect("/listings");
  } catch (err) {
    res.render("pages/listingsForm.ejs", {
      error: err.message,
    });
  }
};

exports.getListings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "No User found. Login Again",
      });
    }
    const listings = await Listings.find({ owner: userId }).populate("owner");
    console.log(listings);
    return res.render("pages/myListings.ejs", {
      listings: listings,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.viewListings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "No User found. Login Again",
      });
    }

    const { id } = req.params;
    const listing = await Listings.findById(id).populate("owner");
    if (!listing) {
      return res.render("pages/myListings.ejs", {
        error: "No Listings Found",
      });
    }

    return res.render("pages/viewListings.ejs", {
      listing: listing,
      user: user,
    });
  } catch (err) {
    res.render("pages/myListings.ejs", {
      error: err.message,
    });
  }
};

exports.getEditListingsForm = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "No User found. Login Again",
      });
    }

    const { id } = req.params;
    const listing = await Listings.findById(id);
    if (!listing) {
      return res.render("pages/myListings.ejs", {
        error: "No Listings Found",
      });
    }

    res.render("pages/editListings.ejs", {
      listing: listing,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.editListings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "No User found. Login Again",
      });
    }
    const { id } = req.params;
    const listings = await Listings.findById(id);
    if (!listings) {
      return res.render("pages/myListings.ejs", {
        error: "No Listings Found",
      });
    }

    //check if the authorized user can update this listings
    if (listings.owner._id.toString() !== userId.toString()) {
      return res.render("pages/myListings.ejs", {
        error: "User is not authorized to edit this listings",
      });
    }

    const { title, description, imageUrl, price, location, country } = req.body;

    listings.title = title || listings.title;
    listings.description = description || listings.description;
    listings.imageUrl = imageUrl || listings.imageUrl;
    listings.price = price || listings.price;
    listings.location = location || listings.location;
    listings.country = country || listings.country;

    await listings.save();

    res.redirect("/listings");
  } catch (err) {
    res.render("pages/myListings.ejs", {
      error: err.message,
    });
  }
};

exports.deleteListings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "No User found. Login Again",
      });
    }

    const { id } = req.params;
    const listings = await Listings.findById(id);
    if (!listings) {
      return res.render("pages/myListings.ejs", {
        error: "No Listings Found",
      });
    }

    if (listings.owner._id.toString() !== userId.toString()) {
      return res.render("pages/myListings.ejs", {
        error: "User is not authorized to delete this listings",
      });
    }

    await Listings.findByIdAndDelete(id);

    res.redirect("/listings");
  } catch (err) {
    res.render("pages/myListings.ejs", {
      error: err.message,
    });
  }
};
