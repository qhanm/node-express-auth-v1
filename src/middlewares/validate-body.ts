// // src/middleware/validator.middleware.ts

// import { Request, Response, NextFunction } from "express";
// import { validate } from "class-validator";

// export default function validationMiddleware<T>(type: any) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // Transform request body to class instance
//       const dto = new type();
//       Object.assign(dto, req.body);

//       // Validate the DTO
//       const errors = await validate(dto);
//       if (errors.length > 0) {
//         const errorMessages = errors
//           .map((error) => Object.values(error.constraints))
//           .join(", ");
//         return res
//           .status(400)
//           .json({ message: "Validation error", errors: errorMessages });
//       }

//       // Attach validated data to the request object
//       req.dto = dto;
//       next();
//     } catch (error) {
//       console.error("Error validating request:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
// }
