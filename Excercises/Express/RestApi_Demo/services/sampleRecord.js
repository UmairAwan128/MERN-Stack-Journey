const Post = require("../models/Post");

let instance = null;

class createServices {
  constructor() {}
  static getInstance() {
    if (!instance) {
      instance = new createServices();
    }
    return instance;
  }

  async createSampleRecord() {
    const sampleRecord = new Post({
      title: "samplePost",
      description: "sampleDesc",
      isPublished: true,
      userId:1
    }); 
    try {
      const result = await sampleRecord.save();
      console.log("Your Database is created with a Sample Record");
      console.log(result);
    } catch (ex) {
      for (property in ex.errors) {
        console.log(ex.errors[property]);
      }
    }
  }
}

module.exports = createServices;
