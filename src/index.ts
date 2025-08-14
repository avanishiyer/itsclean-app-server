import { log } from "console";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import checkIfBathroomExists from "./database/checkIfBathroomExists";
import getAllBathroomCoordinates from "./database/getAllBathroomCoordinates";
import getBathroomById from "./database/getBathroomById";
import getBathroomsList from "./database/getBathroomsList";
import getCommentByBathroom from "./database/getCommentByBathroom";
import postBathroomComment from "./database/postBathroomComment";
import postBathroomReview from "./database/postBathroomReview";

dotenv.config();

const app = express();
app.use(express.json());
const port = Number(process.env.PORT) || 3000;
const corsOptions = {
  origin: false,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/get/list", async (req: Request, res: Response): Promise<Response> => {
  const data = await getBathroomsList();
  if (data == -1) {
    return res.send("Server issue").status(500);
  } else {
  }

  return res.send(data).status(200);
});

app.get(
  "/get/bathroom_coordinates/all",
  async (req: Request, res: Response): Promise<Response> => {
    const data = await getAllBathroomCoordinates();
    if (data == -1) {
      return res.send("Server issue").status(500);
    }

    return res.send(data).status(200);
  }
);

app.get(
  "/get/bathroom_id/:bathroom_id",
  async (req: Request, res: Response): Promise<Response> => {
    const bathroom_id = Number(req.params.bathroom_id);

    const data = await getBathroomById(bathroom_id);
    if (data == -1) {
      return res.send("Server issue").status(500);
    }
    if (data == null) {
      return res.send("Index does not exist").status(400);
    }

    return res.send(data).status(200);
  }
);

app.get(
  "/get/comments_by_bathroom_id/:bathroom_id",
  async (req: Request, res: Response): Promise<Response> => {
    const bathroom_id = Number(req.params.bathroom_id);

    const data = await getCommentByBathroom(bathroom_id);
    if (data == -1) {
      return res.send("Server issue").status(500);
    }
    if (data == null) {
      return res.send("Index does not exist").status(400);
    }

    return res.send(data).status(200);
  }
);

app.post(
  "/post/review",
  async (req: Request, res: Response): Promise<Response> => {
    const isProperReview = (
      value: insertBathroomReview
    ): value is insertBathroomReview => !!value?.name;
    console.log(req.body);

    if (!isProperReview(req.body)) {
      console.log("?");
      return res.send("Improper request format").status(400);
    }

    const review: insertBathroomReview = req.body;

    const data = await postBathroomReview(review);
    if (data == -1) {
      return res.send("Server issue").status(500);
    }

    return res.status(200);
  }
);

app.post(
  "/post/comment/:bathroom_id",
  async (req: Request, res: Response): Promise<Response> => {
    const bathroom_id = Number(req.params.bathroom_id);
    const isProperComment = (
      value: insertBathroomComment
    ): value is insertBathroomComment => !!value?.name;

    if (!isProperComment(req.body)) {
      return res.send("Improper request format").status(400);
    }

    const comment: insertBathroomComment = req.body;

    const exists = await checkIfBathroomExists(bathroom_id);
    if (exists == -1) {
      return res.send("Server issue").status(500);
    } else if (exists == false) {
      return res.send("Bathroom does not exist").status(400);
    }

    const data = await postBathroomComment(comment, bathroom_id);
    if (data == -1) {
      return res.send("Server issue").status(500);
    }

    return res.status(200);
  }
);

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
