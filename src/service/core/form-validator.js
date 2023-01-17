import _ from 'lodash';
import {HTTP} from "./http.service";
import {urls} from "../../config/urlConfig";

class FormValidatorService {
    static fields = {
        mobileOrEmail: {
            rules: [
                {
                    test: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|^(\d){1,4}(-)(\d){10}$/,
                    message: 'Please enter a valid email address or mobile number (i.e. yourname@domain.com or an mobile number only e.g. 0044-9123456789)."',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        NCC: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 6;
                    },
                    message: 'Field is required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        AccountNo: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 1;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        AccountType: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 1;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        AdditionalDetails: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 1;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        BeneficiaryId: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 1;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        BeneficiaryIdType: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 1;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        BeneficiaryPhoneNo: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 1;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        DeclarationAccType: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 1;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        referenceNumber: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 6;
                    },
                    message: 'Please enter the unique reference number provided to you in an email. Please check your mailbox for an email from payer or us with a unique reference number',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        routingNumber: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 6;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        accountType: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 6;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        SWIFTBIC: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 6;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        beneficiaryName: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 6;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        residence: {
            rules: [
                {
                    test: (value) => {
                        return value.length >= 6;
                    },
                    message: 'Field is Required',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        address1: {
            rules: [
                {
                    test: (value) => {
                        return value.length <= 35 && value.length > 0;
                    },
                    message: 'Please enter address',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        postCode: {
            rules: [
                {
                    test: (value) => {
                        return value.length <= 8 && value.length > 0;
                    },
                    message: 'Please enter post code',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        city: {
            rules: [
                {
                    test: (value) => {
                        return value.length <= 35 && value.length > 0;
                    },
                    message: 'Please enter city',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        county: {
            rules: [
                {
                    test: (value) => {
                        return value.length <= 35 && value.length > 0;
                    },
                    message: 'Please enter county or state',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        country: {
            rules: [
                {
                    test: (value) => {
                        return value.length < 1;
                    },
                    message: 'Currency in which you want to claim payment',
                },
            ],
            errors: [],
            valid: false,
            state: '',
        }
    };

    static getDynamicRules(field) {
        const rules = [];
        if (field.presence && field.presence.toLowerCase() === 'm') {
            rules.push({
                test: (value) => {
                    return value.length > 0;
                },
                message: `Field is required`,
            })
        }
        if (field.dataMinLength) {
            rules.push({
                test: (value) => {
                    return value.length >= field.dataMinLength;
                },
                message: `Minimum ${field.dataMinLength} characters required`,
            })
        }
        if (field.dataMaxLength) {
            rules.push({
                test: (value) => {
                    return value.length <= field.dataMaxLength;
                },
                message: `Maximum ${field.dataMaxLength} characters required`,
            })
        }
        if (field.fieldDataType) {
            if (field.fieldDataType.toLowerCase() === 'number') {
                rules.push({
                    test: (value) => {
                        return !isNaN(value);
                    },
                    message: `Only Numeric characters allowed`,
                })
            }
        }

        return rules;
    }

    static async validateField(rules, event, validateStructureFromDB = false) {
        event.persist();
        const value = event.target.value;
        const field = {
            errors: [],
            valid: true,
        };
        if (!rules || _.isEmpty(rules)) {
            return field;
        }
        rules.forEach((rule) => {
            if (rule.test instanceof RegExp) {
                if (!rule.test.test(value)) {
                    field.errors.push(rule.message);
                    field.valid = false;
                }
            } else if (typeof rule.test === 'function') {
                if (!rule.test(value)) {
                    field.errors.push(rule.message);
                    field.valid = false;
                }
            }
        });
        if (field.valid && validateStructureFromDB) {
            let result = '';
            switch (event.target.name) {
                case 'IBAN':
                    result = await this.isIBANValid(value);
                    if (result === 'valid iban') {
                        break;
                    }
                    field.valid = false;
                    field.errors.push('Please enter valid IBAN');
                    break;
                case 'SWIFTBIC':
                    result = await this.isSWIFTBICValid(value);
                    if (result === 'valid') {
                        break;
                    }
                    field.valid = false;
                    field.errors.push('Please enter valid SWIFTBIC');
                    break;
            }
        }
        return field;
    }

    static isFormValid() {
        let errors = [];
        let errorCount = 0;
        Object.keys(this.validators).forEach((field) => {
            if (!this.validators[field].valid) {
                errorCount += this.validators[field].errors.length;
                errors.push({field, errors: this.validators[field].errors});
            }
        });
        return errorCount === 0 ? undefined : errors;
    }

    static getRules(fieldName) {
        const field = this.fields[fieldName];
        if (field) {
            return field.rules
        }
        return [];
    }

    static async isIBANValid(input) {
        const result = await HTTP.post(`${urls.validateIBANStructure}?ibanNumber=${input}`);
        if (result.data) {
            return result.data;
        }
    }

    static async isSWIFTBICValid(input) {
        const result = await HTTP.post(`${urls.validateBIC}?bic=${input}`);
        if (result.data) {
            return result.data;
        }
    }

    static async isNCCValid(input) {
        const result = await HTTP.post(`${urls.validateNCC}?ncc=${input}`);
        if (result.data) {
            return result.data;
        }
    }
}

export default FormValidatorService;
