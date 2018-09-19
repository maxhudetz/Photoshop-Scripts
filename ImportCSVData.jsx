//Asks for a csv file (eg pulled from excel). meant to work for csv's that are only one column. prompts for layers or groups. then based on the name of each line in the file, appends something to the end of the group name. -MH 9/19/18



// var NEW_LAYER_NAME = "test new layer";
var doc = activeDocument;
var layers = doc.artLayers;
append = prompt("Append anything to the end?", "");
layerOrGroup = prompt("Create layers or groups?\nL = layers, G = groups", "G")



app.activeDocument.suspendHistory ('Importing CSV data!', 'readCSV()');

function readCSV()
    {

        if (layerOrGroup != "l" && layerOrGroup != "g" && layerOrGroup != 'L' && layerOrGroup != 'G')
            {
            alert ('enter L for layer or G for group') ;
            return
            }



        var csvFile = File.openDialog("Open Comma-delimited File","comma-delimited(*.csv):*.csv;");csvFile.open('r') ; 
            var csvString = csvFile.read(); 
            csvFile.close(); 
            csvString = csvString.split('\n');
            for(var s = 0;s<csvString.length;s++)
                {
                var lineData = csvString[s].split(",");
                //Process each line of data.
                // alert(lineData[0]);
                if (layerOrGroup == 'l' || layerOrGroup == 'L')
                {
                var newLayer = layers.add();
                newLayer.name = (lineData[0] + append);
                }

                if (layerOrGroup == 'g' || layerOrGroup == 'G')   
                {
                var theGroup = app.activeDocument.layerSets.add()
                theGroup.name = (lineData[0]+append);
                }
                }
    }

// readCSV();

