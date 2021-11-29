const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

/*   
1 - connect to mongodb server -- 
2 - create a schema for our data
3 - create a model from the schema
*/

const connect = () =>{
    return mongoose.connect("mongodb://localhost:27017/job");
}

// company schema
const companySchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      details: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  const company = mongoose.model("company", companySchema);
  
//    skills schema
  const skillsSchema = new mongoose.Schema(
    {
      skills: { type: "string", required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  const skills = mongoose.model("skills", skillsSchema);
//   create city schema
  const citySchema = new mongoose.Schema(
    {
      city: { type: "string", required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  const city = mongoose.model("city", citySchema);
  
//   create job schema
  const jobSchema = new mongoose.Schema(
    {
      company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true,
      },
      skills_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skills",
        required: true,
      },
      city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
        required: true,
      },
      vacancy: { type: Number, required: true },
      notice: { type: String, required: true },
      work_from_home: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  

  const Job = mongoose.model("job", jobSchema);



  
//   ------------CRUD Operations -------------//
  

// company name 
app.post("/company", async (req, res) => {
    try {
      const company = await Company.create(req.body);
      res.status(201).send(company);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

//    get company deatils

  app.get("/company/:id", async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      res.status(201).send(company);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });
  
//   add skills
  app.post("/skills", async (req, res) => {
    try {
      const skills = await skills.create(req.body);
      res.status(201).send(skills);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });
  
//   add city

  app.post("/city", async (req, res) => {
    try {
      const city = await city.create(req.body);
      res.status(201).send(city);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });
  
//   add jobs
  app.post("/job", async (req, res) => {
    try {
      const job = await Job.create(req.body);
      res.status(201).send(job);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });
  
//   get workfromhome jobs

  app.get("/job/workfromhome", async function (req, res) {
    try {
      const job = await Job.find({"work_from_home":"Yes"})
      .populate('company_id')
      .populate('skills_id')
      .populate('city_id');
      res.status(201).send(job);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });
  
//   get notice Period 2 Month

  app.get("/job/notice", async function (req, res) {
    try {
      const job = await Job.find({"notice":"2 month"})
      .populate('company_id')
      .populate('skills_id')
      .populate('city_id')
      res.status(201).send(job);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });
  
//   get ratings high to low

  app.get("/job/ratings", async function (req, res) {
    try {
      const job = await Job.find({}).sort({rating: -1})
      .populate('company_id')
      .populate('skills_id')
      .populate('city_id')
      res.status(201).send(job);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });
  
//    get high vacancy

  app.get("/job/highVacancy", async function (req, res) {
    try {
      const job = await Job.find({}).sort({vacancy: -1})
      .populate('company_id')
      .populate('skills_id')
      .populate('city_id')
      res.status(201).send(job);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

app.listen(8271,  async function(){
    await connect();
    console.log("Listening on 8271")
});