import { Otp } from "../entities/OtpEntity";
import dataSource from "../postgres.config";

const otpRepo = dataSource.getRepository(Otp);

export const saveOtp = async (otp: Otp) => {
    return await otpRepo.save(otp);
};
export const deleteOtpbyEmail = async (email: string) => {
    return await otpRepo.delete({ email: email });
};

export const findByOtp = async (otp: string) => {
    return await otpRepo.findOne({ where: { otp } });
};
