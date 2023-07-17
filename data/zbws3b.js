const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['ZBWS3B(4037A)'],
    model: 'ZBWS3B(4037A)',
    vendor: 'Compacta',
    description: 'SmartenIt 3-button',
    fromZigbee: [fz.battery, fz.command_toggle],
    toZigbee: [],
    exposes: [e.battery(), e.action('toggle').withEndpoint('left'), e.action('toggle').withEndpoint('center'), e.action('toggle').withEndpoint('right')],
    endpoint: (device) => {
        return {'left': 1, 'center': 2, 'right': 3};
    },
    meta: {multiEndpoint: true},
    configure: async (device, coordinatorEndpoint, logger) => {
        await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff', 'genPowerCfg']);
        await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
        await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, ['genOnOff']);
    },
    onEvent: async (type, data, device) => {
        device.skipDefaultResponse = true;
    },
};

module.exports = definition;
