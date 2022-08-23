function deligate(request: NginxHTTPRequest) {
  for (const h in request.headersIn) {
    request.log("header '" + h + "' is '" + request.headersIn[h]);
  }
  //checking for header
  if (request.headersIn['X-HIU-ID']) {
    request.log(
      `routing for headersIn.X-HIU-ID: ${request.headersIn['X-HIU-ID']}`,
    );
    request.internalRedirect(
      '/callback/deligate?deligate_url=lite.mybahmni.in/openmrs/ws/rest/v1/hip/existingPatients/gokul@sbx',
    );
  } else if (request.headersIn['X-HIP-ID']) {
    request.log(
      `routing for headersIn.X-HIP-ID: ${request.headersIn['X-HIP-ID']}`,
    );
    request.internalRedirect(
      '/callback/deligate?deligate_url=lite.mybahmni.in?hip=X-HIP-ID',
    );
  } else {
    request.log(`No heders matched - showing summary`);
    let summary: string;
    summary = 'JS summary\n\n';
    summary += 'Method: ' + request.method + '\n';
    summary += 'HTTP version: ' + request.httpVersion + '\n';
    summary += 'Host: ' + request.headersIn.host + '\n';
    summary += 'Remote Address: ' + request.remoteAddress + '\n';
    summary += 'URI: ' + request.uri + '\n';

    request.status = 200;
    request.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
    request.sendHeader();
    request.send(summary);

    request.finish();
  }
}

export default { deligate };
