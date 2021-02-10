console.log("app.js has loaded");
//let viz is creating a variable that will be assigned to the lines where it says viz
let viz;
let isVizHidden = false;

// TO-DO LIST:
// create variables for url, container and the options of the dashboard
// create a function that initialises the dashboard
// execute this function when the page loads
// create buttons to interact with export options

//step 1
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en&:display_count=y&:origin=viz_share_link";
// copied from the shared link in Tableau Public
//const below means creating a constant. Constants are unique for the entire script
//vizContainer is wherer on the page our viz will show
const vizContainer = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  Category: ["Furniture", "Office Supplies"],
};

const pdfButton = document.getElementById("exportPDF");
//click on the button to export to PDF
pdfButton.addEventListener("click", function () {
  console.log("You clicked on the PDF button");
  viz.showExportPDFDialog();
});

const excelButton = document.getElementById("exportExcel");
//click on the button to export to Excel
excelButton.addEventListener("click", function () {
  console.log("You clicked on the excel button");
  viz.exportCrossTabToExcel();
});

// grab the button
//when you click the button, hide the viz
// when you click the button, update the text to 'Show'

const ShowHideButton = document.getElementById("ShowHideViz");
ShowHideButton.addEventListener("click", ShowHideHandler);

function ShowHideHandler() {
  if (isVizHidden === false) {
    console.log("You clicked the button");
    viz.hide();
    ShowHideButton.innerHTML = "Show Viz";
    isVizHidden = true;
  } else {
    console.log("You clicked the button");
    viz.show();
    ShowHideButton.innerHTML = "Hide Viz";
    isVizHidden = false;
  }
}

const applyFilterButton = document.getElementById("applyFilter");
applyFilterButton.addEventListener("click", getRangeValues);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("Sales", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter has been applied"));
}

//step 2: create function
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

//step 3: execute the function
initViz();
