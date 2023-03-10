import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { log } from "./log";

export const getFormattedPhoneNumber = (cell, country = "US") => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  // we return an empty string vs null when the phone number is inValid
  // because when the cell is null, batch inserts into campaign contacts fail
  // then when contacts have cell.length < 12 (+1), it's deleted before assignments are created
  try {
    const inputNumber = phoneUtil.parse(cell, country);
    const isValid = phoneUtil.isValidNumber(inputNumber);
    if (isValid) {
      return phoneUtil.format(inputNumber, PhoneNumberFormat.E164);
    }
    return "";
  } catch (e) {
    log.error(e);
    return "";
  }
};

const parsePhoneNumber = (e164Number, country = "US") => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const parsed = phoneUtil.parse(e164Number, country);
  return parsed;
};

export const getDisplayPhoneNumber = (e164Number, country = "US") => {
  const parsed = parsePhoneNumber(e164Number, country);
  return phoneUtil.format(parsed, PhoneNumberFormat.NATIONAL);
};

export const getDashedPhoneNumberDisplay = (e164Number, country = "US") => {
  const parsed = parsePhoneNumber(e164Number, country);
  return parsed.getNationalNumber().toString()
    .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export const getCountryCode = (e164Number, country = "US") => {
  const parsed = parsePhoneNumber(e164Number, country);
  return parsed.getCountryCode();
};
