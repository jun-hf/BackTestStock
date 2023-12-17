import Ajv from 'ajv';
const ajv = new Ajv();

const buySellSchema = {
    type: 'object',
    properties: {
        symbol: { type: "string" },
        timeSeries: { type: "string" }
    },
    required: ["symbol", "timeSeries"]
}

const validate = ajv.compile(buySellSchema);
const req = {
    symbol: 'IBM'
};

const validateJson = (json: any) => {
  if (!validate(json)) {
    console.log(validate.errors)
    throw validate.errors
  }
};

validateJson(req)
// const jsonValidator = async (inputSchema: any) => {
//     const validateInput = ajv.compile(inputSchema)
    
// }
