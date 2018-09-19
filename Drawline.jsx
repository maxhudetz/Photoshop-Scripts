

doc = app.activeDocument;  
//draws a line between 2 or more layers' center points. options for width and raster or vector MH 9/19/18


layer = doc.activeLayer;

doThisFunction = drawLine;

sLayers = getSelectedLayersIdx();
Names = new Array();

for (var a in sLayers){

    Names.push(getLayerNameByIndex( Number(sLayers[a]) ) );

    }




checkVars();
app.activeDocument.suspendHistory ('Drawing a Line!', 'Main(Names)');







function Main (arrayPass)
    {
    for (i = 0; i < arrayPass.length-1; i++) 
        { 
        startPoint = GetPosition(arrayPass[i]);
        endPoint = GetPosition(arrayPass[i+1]);
        newLayer = doc.artLayers.add();
        newLayer.name = "line " + (i+1);
        doThisFunction( startPoint, endPoint, lineWidth );
        }
    }


function checkVars ()
    {
        if (Names.length < 2)
    {
        throw ("Select more than 1 layer")
    }
    lineWidth = prompt ("Line width in px", 20);
    if (isNaN(lineWidth))
        {
        throw ("numbers not letters please");
        }
    rasterOrVector = prompt ('Raster or Vector lines? r/v', 'r')
    if (rasterOrVector == "r" || rasterOrVector == "R")
        {
            doThisFunction = drawLine;
        }

    if (rasterOrVector == "v" || rasterOrVector == "V")
        {
            doThisFunction = drawLineVector;
        }


    if (rasterOrVector != 'r' && rasterOrVector != 'R' && rasterOrVector != 'v' && rasterOrVector != 'V')
        {
        throw ('Please enter R for raster lines or V for vector lines');
        }
    }



//get position of selected layer
function GetPosition(inputLayer)
{

    // layer = doc.activeLayer;
    layer = doc.layers.getByName(inputLayer)
    bounds = app.activeDocument.activeLayer.bounds;
    return [(layer.bounds[0].value + layer.bounds[2].value)/2, (layer.bounds[1].value + layer.bounds[3].value)/2];

}



function drawLineVector(startXY, endXY, width)
    {
        // =======================================================
    var idMk = charIDToTypeID( "Mk  " );
        var desc1345 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref440 = new ActionReference();
            var idcontentLayer = stringIDToTypeID( "contentLayer" );
            ref440.putClass( idcontentLayer );
        desc1345.putReference( idnull, ref440 );
        var idUsng = charIDToTypeID( "Usng" );
            var desc1346 = new ActionDescriptor();
            var idType = charIDToTypeID( "Type" );
                var desc1347 = new ActionDescriptor();
                var idClr = charIDToTypeID( "Clr " );
                    var desc1348 = new ActionDescriptor();
                    var idRd = charIDToTypeID( "Rd  " );
                    desc1348.putDouble( idRd, 0.000000 );
                    var idGrn = charIDToTypeID( "Grn " );
                    desc1348.putDouble( idGrn, 0.000000 );
                    var idBl = charIDToTypeID( "Bl  " );
                    desc1348.putDouble( idBl, 0.000000 );
                var idRGBC = charIDToTypeID( "RGBC" );
                desc1347.putObject( idClr, idRGBC, desc1348 );
            var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
            desc1346.putObject( idType, idsolidColorLayer, desc1347 );
            var idShp = charIDToTypeID( "Shp " );
                var desc1349 = new ActionDescriptor();
                var idStrt = charIDToTypeID( "Strt" );
                    var desc1350 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID( "Hrzn" );
                    var idPxl = charIDToTypeID( "#Pxl" );
                    desc1350.putUnitDouble( idHrzn, idPxl, startXY[0] );
                    var idVrtc = charIDToTypeID( "Vrtc" );
                    var idPxl = charIDToTypeID( "#Pxl" );
                    desc1350.putUnitDouble( idVrtc, idPxl, startXY[1] );
                var idPnt = charIDToTypeID( "Pnt " );
                desc1349.putObject( idStrt, idPnt, desc1350 );
                var idEnd = charIDToTypeID( "End " );
                    var desc1351 = new ActionDescriptor();
                    var idHrzn = charIDToTypeID( "Hrzn" );
                    var idPxl = charIDToTypeID( "#Pxl" );
                    desc1351.putUnitDouble( idHrzn, idPxl, endXY[0] );
                    var idVrtc = charIDToTypeID( "Vrtc" );
                    var idPxl = charIDToTypeID( "#Pxl" );
                    desc1351.putUnitDouble( idVrtc, idPxl, endXY[1] );
                var idPnt = charIDToTypeID( "Pnt " );
                desc1349.putObject( idEnd, idPnt, desc1351 );
                var idWdth = charIDToTypeID( "Wdth" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc1349.putUnitDouble( idWdth, idPxl, width );
            var idLn = charIDToTypeID( "Ln  " );
            desc1346.putObject( idShp, idLn, desc1349 );
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
                var desc1352 = new ActionDescriptor();
                var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
                desc1352.putInteger( idstrokeStyleVersion, 2 );
                var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
                desc1352.putBoolean( idstrokeEnabled, true );
                var idfillEnabled = stringIDToTypeID( "fillEnabled" );
                desc1352.putBoolean( idfillEnabled, true );
                var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc1352.putUnitDouble( idstrokeStyleLineWidth, idPxl, 0 );
                var idstrokeStyleLineDashOffset = stringIDToTypeID( "strokeStyleLineDashOffset" );
                var idPnt = charIDToTypeID( "#Pnt" );
                desc1352.putUnitDouble( idstrokeStyleLineDashOffset, idPnt, 0.000000 );
                var idstrokeStyleMiterLimit = stringIDToTypeID( "strokeStyleMiterLimit" );
                desc1352.putDouble( idstrokeStyleMiterLimit, 100.000000 );
                var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
                var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
                var idstrokeStyleButtCap = stringIDToTypeID( "strokeStyleButtCap" );
                desc1352.putEnumerated( idstrokeStyleLineCapType, idstrokeStyleLineCapType, idstrokeStyleButtCap );
                var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
                var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
                var idstrokeStyleMiterJoin = stringIDToTypeID( "strokeStyleMiterJoin" );
                desc1352.putEnumerated( idstrokeStyleLineJoinType, idstrokeStyleLineJoinType, idstrokeStyleMiterJoin );
                var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
                var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
                var idstrokeStyleAlignInside = stringIDToTypeID( "strokeStyleAlignInside" );
                desc1352.putEnumerated( idstrokeStyleLineAlignment, idstrokeStyleLineAlignment, idstrokeStyleAlignInside );
                var idstrokeStyleScaleLock = stringIDToTypeID( "strokeStyleScaleLock" );
                desc1352.putBoolean( idstrokeStyleScaleLock, false );
                var idstrokeStyleStrokeAdjust = stringIDToTypeID( "strokeStyleStrokeAdjust" );
                desc1352.putBoolean( idstrokeStyleStrokeAdjust, false );
                var idstrokeStyleLineDashSet = stringIDToTypeID( "strokeStyleLineDashSet" );
                    var list139 = new ActionList();
                desc1352.putList( idstrokeStyleLineDashSet, list139 );
                var idstrokeStyleBlendMode = stringIDToTypeID( "strokeStyleBlendMode" );
                var idBlnM = charIDToTypeID( "BlnM" );
                var idNrml = charIDToTypeID( "Nrml" );
                desc1352.putEnumerated( idstrokeStyleBlendMode, idBlnM, idNrml );
                var idstrokeStyleOpacity = stringIDToTypeID( "strokeStyleOpacity" );
                var idPrc = charIDToTypeID( "#Prc" );
                desc1352.putUnitDouble( idstrokeStyleOpacity, idPrc, 100.000000 );
                var idstrokeStyleContent = stringIDToTypeID( "strokeStyleContent" );
                    var desc1353 = new ActionDescriptor();
                    var idClr = charIDToTypeID( "Clr " );
                        var desc1354 = new ActionDescriptor();
                        var idRd = charIDToTypeID( "Rd  " );
                        desc1354.putDouble( idRd, 0.000000 );
                        var idGrn = charIDToTypeID( "Grn " );
                        desc1354.putDouble( idGrn, 0.000000 );
                        var idBl = charIDToTypeID( "Bl  " );
                        desc1354.putDouble( idBl, 0.000000 );
                    var idRGBC = charIDToTypeID( "RGBC" );
                    desc1353.putObject( idClr, idRGBC, desc1354 );
                var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
                desc1352.putObject( idstrokeStyleContent, idsolidColorLayer, desc1353 );
                var idstrokeStyleResolution = stringIDToTypeID( "strokeStyleResolution" );
                desc1352.putDouble( idstrokeStyleResolution, 102.000000 );
            var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
            desc1346.putObject( idstrokeStyle, idstrokeStyle, desc1352 );
        var idcontentLayer = stringIDToTypeID( "contentLayer" );
        desc1345.putObject( idUsng, idcontentLayer, desc1346 );
        var idLyrI = charIDToTypeID( "LyrI" );
        desc1345.putInteger( idLyrI, 120 );
    executeAction( idMk, desc1345, DialogModes.NO );
    }



function drawLine( startXY, endXY, width ) 
    {  
     var desc = new ActionDescriptor();  
        var lineDesc = new ActionDescriptor();  
            var startDesc = new ActionDescriptor();  
            startDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), startXY[0] );  
            startDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), startXY[1] );  
        lineDesc.putObject( charIDToTypeID('Strt'), charIDToTypeID('Pnt '), startDesc );  
            var endDesc = new ActionDescriptor();  
            endDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), endXY[0] );  
            endDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), endXY[1] );  
        lineDesc.putObject( charIDToTypeID('End '), charIDToTypeID('Pnt '), endDesc );  
        lineDesc.putUnitDouble( charIDToTypeID('Wdth'), charIDToTypeID('#Pxl'), width );  
    desc.putObject( charIDToTypeID('Shp '), charIDToTypeID('Ln  '), lineDesc );  
    desc.putBoolean( charIDToTypeID('AntA'), true );  
    executeAction( charIDToTypeID('Draw'), desc, DialogModes.NO );  
    };  

// selects backward layer=======================================================

function SelectBackwardLayer ()
    {
    var idslct = charIDToTypeID( "slct" );
        var desc20 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref12 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idBckw = charIDToTypeID( "Bckw" );
            ref12.putEnumerated( idLyr, idOrdn, idBckw );
        desc20.putReference( idnull, ref12 );
        var idMkVs = charIDToTypeID( "MkVs" );
        desc20.putBoolean( idMkVs, false );
        var idLyrI = charIDToTypeID( "LyrI" );
            var list3 = new ActionList();
            list3.putInteger( 4 );
        desc20.putList( idLyrI, list3 );
    executeAction( idslct, desc20, DialogModes.NO );
    }

// selects forward layer=======================================================

function SelectForwardLayer ()
    {
    var idslct = charIDToTypeID( "slct" );
        var desc21 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref13 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idFrwr = charIDToTypeID( "Frwr" );
            ref13.putEnumerated( idLyr, idOrdn, idFrwr );
        desc21.putReference( idnull, ref13 );
        var idMkVs = charIDToTypeID( "MkVs" );
        desc21.putBoolean( idMkVs, false );
        var idLyrI = charIDToTypeID( "LyrI" );
            var list4 = new ActionList();
            list4.putInteger( 5 );
        desc21.putList( idLyrI, list4 );
    executeAction( idslct, desc21, DialogModes.NO );
    }



// =======================================================

 

function getLayerNameByIndex( idx ) {

    var ref = new ActionReference();

    ref.putIndex( charIDToTypeID( "Lyr " ), idx );

    return executeActionGet(ref).getString(charIDToTypeID( "Nm  " ));

};

function getSelectedLayersIdx()
    {

      var selectedLayers = new Array;

      var ref = new ActionReference();

      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );

      var desc = executeActionGet(ref);

      if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){

         desc = desc.getList( stringIDToTypeID( 'targetLayers' ));

          var c = desc.count

          var selectedLayers = new Array();

          for(var i=0;i<c;i++){

            try{

               activeDocument.backgroundLayer;

               selectedLayers.push(  desc.getReference( i ).getIndex() );

            }catch(e){

               selectedLayers.push(  desc.getReference( i ).getIndex()+1 );

            }

          }

       }else{

         var ref = new ActionReference();

         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" ));

         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );

         try{

            activeDocument.backgroundLayer;

            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1);

         }catch(e){

            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));

         }

     var vis = app.activeDocument.activeLayer.visible;

        if(vis == true) app.activeDocument.activeLayer.visible = false;

        var desc9 = new ActionDescriptor();

    var list9 = new ActionList();

    var ref9 = new ActionReference();

    ref9.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );

    list9.putReference( ref9 );

    desc9.putList( charIDToTypeID('null'), list9 );

    executeAction( charIDToTypeID('Shw '), desc9, DialogModes.NO );

    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();

        app.activeDocument.activeLayer.visible = vis;

      }

      return selectedLayers;

    };