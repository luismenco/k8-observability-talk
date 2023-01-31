/*tracing.js*/
const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations,} = require("@opentelemetry/auto-instrumentations-node");
const {OTLPTraceExporter,} = require("@opentelemetry/exporter-trace-otlp-http");
const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {"app":"name"},
  }),
  instrumentations: [getNodeAutoInstrumentations(), new WinstonInstrumentation({
    logHook: (span, record) => {record['resource.service.name'] = provider.resource.attributes['service.name'];},
  })],
});
sdk.start();