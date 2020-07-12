const complianceIndicator = String.fromCharCode(0x40)
const dataElementSeparator = String.fromCharCode(0x0A)
const recordSeparator = String.fromCharCode(0x1E)
const segmentTerminator = String.fromCharCode(0x0D)


const FILE_TYPE_LENGTH = 5
const FILE_ISSUER_IDENTIFICATION_NUMBER_LENGTH = 6
const FILE_AAMVA_VERSION_NUMBER_LENGTH = 2
const FILE_JURISDICTION_VERSION_NUMBER_LENGTH = 2
const FILE_NUMBER_OF_ENTRIES_LENGTH = 2


const SUBFILE_TYPE_LENGTH = 2
const SUBFILE_OFFSET_LENGTH = 4
const SUBFILE_LENGTH_LENGTH = 4
const SUBFILE_HEADER_LENGTH = SUBFILE_TYPE_LENGTH + SUBFILE_OFFSET_LENGTH + SUBFILE_LENGTH_LENGTH

const dataElements = {
  UNKNOWN: {
    element: `Unknown`,
    definition: `Metadata is unavailable for this element. Please see the AAMVA DL/ID Card Design Standard for the latest information regarding this element id.`,
    cardType: null,
    lengthType: null,
    mandatory: false,
  },
  DCA: {
    element: `Jurisdiction-specific vehicle class / group code, designating the type of vehicle the cardholder has privilege to drive.`,
    definition: `Jurisdiction-specific codes that represent additional privileges granted to the cardholder beyond the vehicle class (such as transportation of passengers, hazardous materials, operation of motorcycles, etc.).`,
    cardType: `DL`,
    lengthType: `V6ANS`,
    mandatory: true,
  },
  DCB: {
    element: `Jurisdiction-specific restriction codes`,
    definition: `Jurisdiction-specific codes that represent restrictions to driving privileges (such as airbrakes, automatic transmission, daylight only,etc.).`,
    cardType: `DL`,
    lengthType: `V12ANS`,
    mandatory: true,
  },
  DCD: {
    element: `Jurisdiction-specific endorsement codes`,
    definition: `Jurisdiction-specific codes that represent additional privileges granted to the cardholder beyond the vehicle class (such as transportation of passengers, hazardous materials, operation of motorcycles, etc.).`,
    cardType: `DL`,
    lengthType: `V5ANS`,
    mandatory: true,
  },
  DBA: {
    element: `Document Expiration Date`,
    definition: `Date on which the driving and identification privileges granted by the document are no longer valid. (MMDDCCYY for U.S.,CCYYMMDD for Canada)`,
    cardType: `BOTH`,
    lengthType: `F8N`,
    mandatory: true,
  },
  DCS: {
    element: `Customer Family Name`,
    definition: `Family name of the cardholder. (Family name is sometimes also called “last name” or “surname.”) Collect full name for record, print as many characters as possible on portrait side of DL/ID.`,
    cardType: `BOTH`,
    lengthType: `V40ANS`,
    mandatory: true,
  },
  DAC: {
    element: `Customer First Name`,
    definition: `First name of the cardholder.`,
    cardType: `BOTH`,
    lengthType: `V40ANS`,
    mandatory: true,
  },
  DAD: {
    element: `Customer Middle Name(s)`,
    definition: `Middle name(s) of the cardholder. In the case of multiple middle names they shall be separated by a comma “,”.`,
    cardType: `BOTH`,
    lengthType: `V40ANS`,
    mandatory: true,
  },
  DBD: {
    element: `Document Issue Date`,
    definition: `Date on which the document was issued. (MMDDCCYY for U.S., CCYYMMDD for Canada)`,
    cardType: `BOTH`,
    lengthType: `F8N`,
    mandatory: true,
  },
  DBB: {
    element: `Date of Birth`,
    definition: `Date on which the cardholder was born. (MMDDCCYY for U.S., CCYYMMDD for Canada)`,
    cardType: `BOTH`,
    lengthType: `F8N`,
    mandatory: true,
  },
  DBC: {
    element: `Physical Description – Sex`,
    definition: `Gender of the cardholder. 1 = male, 2 = female.`,
    cardType: `BOTH`,
    lengthType: `F1N`,
    mandatory: true,
  },
  DAY: {
    element: `Physical Description – Eye Color`,
    definition: `Color of cardholder's eyes. (ANSI D-20 codes)`,
    cardType: `BOTH`,
    lengthType: `F3A`,
    mandatory: true,
  },
  DAU: {
    element: `Physical Description – Height`,
    definition: `Height of cardholder. Inches (in): number of inches followed by " in" ex. 6'1'' = "073 in" Centimeters (cm): number of centimeters followed by " cm" ex. 181 centimeters="181 cm"`,
    cardType: `BOTH`,
    lengthType: `F6AN`,
    mandatory: true,
  },
  DAG: {
    element: `Address – Street 1`,
    definition: `Street portion of the cardholder address.`,
    cardType: `BOTH`,
    lengthType: `V35ANS`,
    mandatory: true,
  },
  DAI: {
    element: `Address – City`,
    definition: `City portion of the cardholder address.`,
    cardType: `BOTH`,
    lengthType: `V20ANS`,
    mandatory: true,
  },
  DAJ: {
    element: `Address – Jurisdiction Code`,
    definition: `State portion of the cardholder address.`,
    cardType: `BOTH`,
    lengthType: `F2A`,
    mandatory: true,
  },
  DAK: {
    element: `Address – Postal Code`,
    definition: `Postal code portion of the cardholder address in the U.S. and Canada. If the trailing portion of the postal code in the U.S. is not known, zeros will be used to fill the trailing set of numbers up to nine (9) digits.`,
    cardType: `BOTH`,
    lengthType: `F11AN`,
    mandatory: true,
  },
  DAQ: {
    element: `Customer ID Number`,
    definition: `The number assigned or calculated by the issuing authority.`,
    cardType: `BOTH`,
    lengthType: `V25ANS`,
    mandatory: true,
  },
  DCF: {
    element: `Document Discriminator`,
    definition: `Number must uniquely identify a particular document issued to that customer from others that may have been issued in the past. This number may serve multiple purposes of document discrimination, audit information number, and/or inventory control.`,
    cardType: `BOTH`,
    lengthType: `V25ANS`,
    mandatory: true,
  },
  DCG: {
    element: `Country Identification`,
    definition: `Country in which DL/ID is issued. U.S. = USA, Canada = CAN.`,
    cardType: `BOTH`,
    lengthType: `F3A`,
    mandatory: true,
  },
  DDE: {
    element: `Family name truncation`,
    definition: `A code that indicates whether a field has been truncated (T), has not been truncated (N), or –unknown whether truncated (U).`,
    cardType: `BOTH`,
    lengthType: `F1A`,
    mandatory: true,
  },
  DDF: {
    element: `First name truncation`,
    definition: `A code that indicates whether a field has been truncated (T), has not been truncated (N), or –unknown whether truncated (U).`,
    cardType: `BOTH`,
    lengthType: `F1A`,
    mandatory: true,
  },
  DDG: {
    element: `Middle name truncation`,
    definition: `A code that indicates whether a field has been truncated (T), has not been truncated (N), or –unknown whether truncated (U).`,
    cardType: `BOTH`,
    lengthType: `F1A`,
    mandatory: true,
  },
  DAH: {
    element: `Address – Street 2`,
    definition: `Second line of street portion of the cardholder address.`,
    cardType: `BOTH`,
    lengthType: `V35ANS`,
    mandatory: false,
  },
  DAZ: {
    element: `Hair color`,
    definition: `Bald, black, blonde, brown, gray, red/auburn, sandy, white, unknown. If the issuing jurisdiction wishes to abbreviate colors, the three-character codes provided in ANSI D20 must be used.`,
    cardType: `BOTH`,
    lengthType: `V12A`,
    mandatory: false,
  },
  DCI: {
    element: `Place of birth`,
    definition: `Country and municipality and/or state/province`,
    cardType: `BOTH`,
    lengthType: `V33A`,
    mandatory: false,
  },
  DCJ: {
    element: `Audit information`,
    definition: `A string of letters and/or numbers that identifies when, where, and by whom a driver license/ID card was made. If audit information is not used on the card or the MRT, it must be included in the driver record.`,
    cardType: `BOTH`,
    lengthType: `V25ANS`,
    mandatory: false,
  },
  DCK: {
    element: `Inventory control number`,
    definition: `A string of letters and/or numbers that is affixed to the raw materials (card stock, laminate, etc.) used in producing driver licenses and ID cards. (DHS recommended field)`,
    cardType: `BOTH`,
    lengthType: `V25ANS`,
    mandatory: false,
  },
  DBN: {
    element: `Alias / AKA Family Name`,
    definition: `Other family name by which cardholder is known.`,
    cardType: `BOTH`,
    lengthType: `V10ANS`,
    mandatory: false,
  },
  DBG: {
    element: `Alias / AKA Given Name`,
    definition: `Other given name by which cardholder is known`,
    cardType: `BOTH`,
    lengthType: `V15ANS`,
    mandatory: false,
  },
  DBS: {
    element: `Alias / AKA Suffix Name`,
    definition: `Other suffix by which cardholder is known`,
    cardType: `BOTH`,
    lengthType: `V5ANS`,
    mandatory: false,
  },
  DCU: {
    element: `Name Suffix`,
    definition: `Name Suffix (If jurisdiction participates in systems requiring name suffix (PDPS, CDLIS, etc.), the suffix must be collected and displayed on the DL/ID and in the MRT). Collect full name for record, print as many characters as possible on portrait side of DL/ID. JR (Junior), SR (Senior), 1ST or I (First), 2ND or II (Second), 3RD or III (Third), 4TH or IV (Fourth), 5TH or V (Fifth), 6TH or VI (Sixth) 7TH or VII (Seventh), 8TH or VIII (Eighth), 9TH or IX (Ninth)`,
    cardType: `BOTH`,
    lengthType: `V5ANS`,
    mandatory: false,
  },
  DCE: {
    element: `Physical Description – Weight Range`,
    definition: `Indicates the approximate weight range of the cardholder: 0 = up to 31 kg (up to 70 lbs), 1 = 32 – 45 kg (71 – 100 lbs), 2 = 46 - 59 kg (101 – 130 lbs), 3 = 60 - 70 kg (131 – 160 lbs), 4 = 71 - 86 kg (161 – 190 lbs), 5 = 87 - 100 kg (191 – 220 lbs) 6 = 101 - 113 kg (221 – 250 lbs) 7 = 114 - 127 kg (251 – 280 lbs) 8 = 128 – 145 kg (281 – 320 lbs) 9 = 146+ kg (321+ lbs)`,
    cardType: `BOTH`,
    lengthType: `F1N`,
    mandatory: false,
  },
  DCL: {
    element: `Race / ethnicity`,
    definition: `Codes for race or ethnicity of the cardholder, as defined in ANSI D20.`,
    cardType: `BOTH`,
    lengthType: `F3A`,
    mandatory: false,
  },
  DCM: {
    element: `Standard vehicle classification`,
    definition: `Standard vehicle classification code(s) for cardholder. This data element is a placeholder for future efforts to standardize vehicle classifications.`,
    cardType: `DL`,
    lengthType: `F4AN`,
    mandatory: false,
  },
  DCN: {
    element: `Standard endorsement code`,
    definition: `Standard endorsement code(s) for cardholder. See codes in D20. This data element is a placeholder for future efforts to standardize endorsement codes.`,
    cardType: `DL`,
    lengthType: `F5AN`,
    mandatory: false,
  },
  DCO: {
    element: `Standard restriction code`,
    definition: `Standard restriction code(s) for cardholder. See codes in D20. This data element is a placeholder for future efforts to standardize restriction codes.`,
    cardType: `DL`,
    lengthType: `F12AN`,
    mandatory: false,
  },
  DCP: {
    element: `Jurisdiction-specific vehicle classification description`,
    definition: `Text that explains the jurisdiction-specific code(s) for classifications of vehicles cardholder is authorized to drive.`,
    cardType: `DL`,
    lengthType: `V50ANS`,
    mandatory: false,
  },
  DCQ: {
    element: `Jurisdiction-specific endorsement code description`,
    definition: `Text that explains the jurisdiction-specific code(s) that indicates additional driving privileges granted to the cardholder beyond the vehicle class.`,
    cardType: `DL`,
    lengthType: `V50ANS`,
    mandatory: false,
  },
  DCR: {
    element: `Jurisdiction-specific restriction code description`,
    definition: `Text describing the jurisdiction-specific restriction code(s) that curtail driving privileges.`,
    cardType: `DL`,
    lengthType: `V50ANS`,
    mandatory: false,
  },
  DDA: {
    element: `Compliance Type`,
    definition: `DHS required field that indicates compliance: “M” = materially compliant; “F” = fully compliant; and, “N” = non-compliant.`,
    cardType: `BOTH`,
    lengthType: `F1A`,
    mandatory: false,
  },
  DDB: {
    element: `Card Revision Date`,
    definition: `DHS required field that indicates date of the most recent version change or modification to the visible format of the DL/ID (MMDDCCYY for U.S., CCYYMMDD for Canada)`,
    cardType: `BOTH`,
    lengthType: `F8N`,
    mandatory: false,
  },
  DDC: {
    element: `HAZMAT Endorsement Expiration Date`,
    definition: `Date on which the hazardous material endorsement granted by the document is no longer valid. (MMDDCCYY for U.S., CCYYMMDD for Canada)`,
    cardType: `DL`,
    lengthType: `F8N`,
    mandatory: false,
  },
  DDD: {
    element: `Limited Duration Document Indicator`,
    definition: `DHS required field that indicates that the cardholder has temporary lawful status = “1”.`,
    cardType: `BOTH`,
    lengthType: `F1N`,
    mandatory: false,
  },
  DAW: {
    element: `Weight (pounds)`,
    definition: `Cardholder weight in pounds Ex. 185 lb = “185”`,
    cardType: `BOTH`,
    lengthType: `F3N`,
    mandatory: false,
  },
  DAX: {
    element: `Weight (kilograms)`,
    definition: `Cardholder weight in kilograms Ex. 84 kg = “084”`,
    cardType: `BOTH`,
    lengthType: `F3N`,
    mandatory: false,
  },
  DDH: {
    element: `Under 18 Until`,
    definition: `Date on which the cardholder turns 18 years old. (MMDDCCYY for U.S., CCYYMMDD for Canada)`,
    cardType: `BOTH`,
    lengthType: `F8N`,
    mandatory: false,
  },
  DDI: {
    element: `Under 19 Until`,
    definition: `Date on which the cardholder turns 19 years old. (MMDDCCYY for U.S., CCYYMMDD for Canada)`,
    cardType: `BOTH`,
    lengthType: `F8N`,
    mandatory: false,
  },
  DDJ: {
    element: `Under 21 Until`,
    definition: `Date on which the cardholder turns 21 years old. (MMDDCCYY for U.S., CCYYMMDD for Canada)`,
    cardType: `BOTH`,
    lengthType: `F8N`,
    mandatory: false,
  },
  DDK: {
    element: `Organ Donor Indicator`,
    definition: `Field that indicates that the cardholder is an organ donor = “1”.`,
    cardType: `BOTH`,
    lengthType: `F1N`,
    mandatory: false,
  },
  DDL: {
    element: `Veteran Indicator`,
    definition: `Field that indicates that the cardholder is a veteran = “1”`,
    cardType: `BOTH`,
    lengthType: `F1N`,
    mandatory: false,
  },
  ZCA: {
    element: `Unknown`,
    definition: `Defined by California.`,
    cardType: `ZC`,
    lengthType: null,
    mandatory: false,
  },
  ZCB: {
    element: `Unknown (Vision Corrections?)`,
    definition: `Defined by California. (e.g. "CORR LENS")`,
    cardType: `ZC`,
    lengthType: null,
    mandatory: false,
  },
  ZCC: {
    element: `Unknown (Eye Color?)`,
    definition: `Defined by California. (e.g. "HZL")`,
    cardType: `ZC`,
    lengthType: null,
    mandatory: false,
  },
  ZCD: {
    element: `Unknown (Hair/Eye Color?)`,
    definition: `Defined by California. (e.g. "BRN")`,
    cardType: `ZC`,
    lengthType: null,
    mandatory: false,
  },
  ZCE: {
    element: `Unknown`,
    definition: `Defined by California.`,
    cardType: `ZC`,
    lengthType: null,
    mandatory: false,
  },
  ZCF: {
    element: `Unknown`,
    definition: `Defined by California.`,
    cardType: `ZC`,
    lengthType: null,
    mandatory: false,
  },
}

function parseLengthType(lengthType) {
  const result = {
    lengthType: null,
    maxLength: null,
    valueTypes: lengthType ? [] : null,
  }
  if (lengthType.startsWith(`F`)) {
    result.lengthType = `FIXED`
  } else if (lengthType.startsWith(`V`)) {
    result.lengthType = `VARIABLE`
  }
  const maxLengthString = lengthType.replace(/[^0-9]/g, ``)
  if (maxLengthString) {
    result.maxLength = parseInt(maxLengthString, 10)
  }
  if (lengthType.indexOf(`A`) !== -1) {
    result.valueTypes.push(`ALPHA`)
  }
  if (lengthType.indexOf(`N`) !== -1) {
    result.valueTypes.push(`NUMERIC`)
  }
  if (lengthType.indexOf(`S`) !== -1) {
    result.valueTypes.push(`SPECIAL`)
  }
  if (result.valueTypes.length === 0) {
    result.valueTypes = null
  }
}

export default function parse(photoIdScanData) {
  const result = {
    compliant: false,
    fileType: null,
    issuerIdentificationNumber: null,
    aamvaVersionNumber: null,
    jurisdictionVersionNumber: null,
    numberOfEntries: null,
    subfiles: [],
  }
  // 26 lines redacted for security. See README.md for details.
  // Parse each subfile
  for (let entryIndex = 0; entryIndex < result.numberOfEntries; entryIndex += 1) {
    const subfile = {
      type: null,
      offset: null,
      length: null,
      data: {},
    }
    // 24 lines redacted for security. See README.md for details.
    result.subfiles.push(subfile)
  }
}
