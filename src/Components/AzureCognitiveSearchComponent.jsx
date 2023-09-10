import React, { useEffect } from 'react';

const AzureCognitiveSearchComponent = () => {
   useEffect(() => {
    // Initialize and connect to your search service
    var automagic = new AzSearch.Automagic({
      index: "azureblob-index-metadata",
      queryKey: process.env.REACT_APP_API_KEY,
      service: "testingblobsearch",
      dnsSuffix: "search.windows.net"
    });

    function generateSasUrl(path) {
      const sasToken = 'sp=r&st=2023-09-06T16:46:39Z&se=2023-09-08T00:46:39Z&spr=https&sv=2022-11-02&sr=c&sig=g6HQLgBkOm%2F5bXxvZ%2FvaVxgMai98gI4ZoQbQeQKiAU0%3D'; // Replace with your SAS token
      const sasUrl = `${path}?${sasToken}`;
      window.open(sasUrl, '_blank');
    }

    const resultTemplate = `
    <div className="col-xs-12 col-sm-9 col-md-9">
        <h4>{{metadata_storage_name}}</h4>
        <div className="resultDescription">{{metadata_storage_path}}</div>
        <button onclick="generateSasUrl('{{metadata_storage_path}}')">Open</button>
        <!-- Add a placeholder for displaying the SAS URL -->
        <p id="sasUrl"></p>
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
    automagic.addClearFiltersButton("clearFilters");
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
      <div className="row">
                <div id="facetPanel" className="col-sm-3 col-md-3 sidebar collapse">
                    <div id="clearFilters"></div>
                    <ul className="nav nav-sidebar">
                        <div className="panel panel-primary behclick-panel">

                        </div>
                    </ul>
                </div>
                <div className="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 results_section">
                    <div id="results" className="row placeholders">
                    </div>
                    <div id="pager" className="row">
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
};

export default AzureCognitiveSearchComponent;
