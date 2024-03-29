import { Request, Response } from "express";
import { createPresignedUrlToUpload, deleteFileByUrl } from "../libs/s3-client";
import User from "../models/user-model";
import * as statusMessage from "../utils/status-message";

export function getAuthUser(req: Request, res: Response) {
  statusMessage.inProgress("get auth user");
  try {
    res.json(req.user || null);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

export async function getUserBySlug(req: Request, res: Response) {
  statusMessage.inProgress("get user by slug");
  try {
    const { slug } = req.body;
    const user = await User.getBySlug(slug);
    res.json(user);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

export async function getPresignedUrlToUpload(_: Request, res: Response) {
  statusMessage.inProgress("get presigned url for upload");
  try {
    const presignedUrl = await createPresignedUrlToUpload();
    res.json(presignedUrl);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

export async function deleteOldAvatar(req: Request) {
  statusMessage.inProgress("delete old avatar");
  try {
    const { avatarUrl } = req.body;
    await deleteFileByUrl(avatarUrl);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}

export async function updateUserProfile(req: Request, res: Response) {
  statusMessage.inProgress("update user profile");
  try {
    const { _id, displayName, avatarUrl } = req.body;
    const updatedUser = await User.updateById({
      id: _id,
      displayName,
      avatarUrl,
    });
    res.json(updatedUser);
    statusMessage.isDone();
  } catch (err) {
    statusMessage.haveError();
    console.log(err);
  }
}
