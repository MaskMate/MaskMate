import Otp from "@/db/entities/OtpEntity";
import dataSource from "@/db/postgres.config";

const otpRepo = dataSource.getRepository(Otp);

export const saveOtp = async (otp: Otp) => {
    return await otpRepo.save(otp);
};

export const verifyEmail = async (newOtp: Otp) => {
    return await otpRepo.update({ email: newOtp.email }, newOtp);
};

export const deleteOtpbyEmail = async (email: string) => {
    const otp = await otpRepo.findOne({ where: { email: email } });

    if (!otp) throw new Error("Email ID does not exist.");
    if (otp.verified === false) throw new Error("Email ID is not verified.");

    return await deleteOldEmail(email);
};

export const deleteOldEmail = async (email: string) => {
    await otpRepo.delete({ email });
};

export const findByOtp = async (otp: string) => {
    return await otpRepo.findOne({ where: { otp }, select: ["otp"] });
};

export const findOtpByEmail = async (email: string) => {
    return await otpRepo.findOne({ where: { email } });
};
