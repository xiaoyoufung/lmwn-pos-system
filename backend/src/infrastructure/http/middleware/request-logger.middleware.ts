import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import type { ILogger } from "../../../core/logging/ILogger.js";
import { TOKENS } from "../../../core/di/tokens.js";

export function attachRequestLogger(req: Request, res: Response, next: NextFunction) {
  const baseLogger = container.resolve<ILogger>(TOKENS.Logger);
  const requestId = req.id;

  req.logger = baseLogger.child({
    requestId,
    path: req.originalUrl ?? req.url,
    context: "APP",
  });

  next();
}