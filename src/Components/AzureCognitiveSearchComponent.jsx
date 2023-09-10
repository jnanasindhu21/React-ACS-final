import React, { useEffect } from 'react';

const AzureCognitiveSearchComponent = () => {
   useEffect(() => {

    function generateSasUrl(path) {
      const sasToken = 'sp=r&st=2023-09-10T14:15:54Z&se=2023-09-19T22:15:54Z&spr=https&sv=2022-11-02&sr=c&sig=D838SchF1tOstb8lceZWYDNG%2BfDO%2B0hxg0iwGhaFVWY%3D'; // Replace with your SAS token
        const sasUrl = `${path}?${sasToken}`;
        const link = document.createElement('a');
        link.href = sasUrl;
        link.target = '_blank'; // Opens the URL in a new tab/window
        link.click();
    }
    // Initialize and connect to your search service
    var automagic = new AzSearch.Automagic({
      index: "azureblob-index-metadata",
      queryKey: process.env.REACT_APP_API_KEY,
      service: "testingblobsearch",
      dnsSuffix: "search.windows.net"
    });

    

    const resultTemplate = `
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="card custom-card">
                <div className="card-body">
                  <h5 className="card-title"><span className="font-weight-bold">File Name: </span>{{metadata_storage_name}}</h5>
                  <p className="card-text resultDescription"><span>File Path: </span>{{{metadata_storage_path}}}</p><br>
                  <button onClick="generateSasUrl('{{metadata_storage_path}}')">Open</button
                </div>
              </div>
            </div>
          </div>
      </div>
    `;

    // Add the results view using the template defined above
    automagic.addResults("results", {
      count: true
    }, resultTemplate);

    // Adds a pager control << 1 2 3 ... >>
    automagic.addPager("pager");

    // Adds a search box
    automagic.addSearchBox("searchBox");

    // Adds a button to clear any applied filters
    
  }, []);
 
  return (
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#facetPanel" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="row">
                        <div className="col-md-2 pagelabel">
                            <a className="navbar-brand pagelabel" target="_blank"
                                href="https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.Search%2FsearchServices">Azure
                                Cognitive Search</a>
                        </div>
                        <div id="searchBox" className="col-md-8 col-sm-8 col-xs-6"></div>
                        <div id="navbar" className="navbar-collapse collapse">
                        </div>
                    </div>
                </div>
            </div>
      </nav>
      <div className="container-fluid">
      <div class="row">
                <div class="col-sm-12 col-md-12 results_section">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div id="results" class="row placeholders text-center"></div>
                        </div>
                    </div>
                    <div class="container justify-content-center align-items-center">
                        <div id="pager" class="row"></div>
                    </div>
                </div>
            </div>
            </div>
      </div>
   
  );
};

export default AzureCognitiveSearchComponent;
