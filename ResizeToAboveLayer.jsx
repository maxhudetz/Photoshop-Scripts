
//this script takes an original layer and resizes it to the size of the layer directly above it, with optional padding added via a popup window. handy for putting boxes behind text - MH 9/19/18


//=======================================================


// NOTE when you use suspendHistory it automatically runs the function mentioned (don't need to call it)

app.activeDocument.suspendHistory ('Resizing To Fit Layer Above...', 'Main()');


//=======================================================
function Main ()
    {
            

    var doc = app.activeDocument;  
    var layer = doc.activeLayer;
    var bounds = app.activeDocument.activeLayer.bounds; 
    originalWidth = bounds[2].as('px')-bounds[0].as('px');  
    originalHeight = bounds[3].as('px')-bounds[1].as('px');


    //check we aren't on top layer
    selectFront();
    var topLayer = doc.activeLayer;
    app.activeDocument.activeLayer = layer;


    if(layer.isBackgroundLayer)
    {
       alert ("select a non-background layer");
       return 
    }

    // alert ('topLayer = ' + topLayer + "/n original layer = " + layer);

    if (layer.name == topLayer.name)
    {
       alert ("nothing above this layer to resize to");
       return 
    }

    //prompt use for padding amount
    padding = prompt("How Much Padding Do Ya Want in px?", "0");
    
    //check we put in an actual number
    if (isNaN(padding))
    {
    alert ("numbers not letters please");
    return
    }

    //turn string into a number (otherwise 10 + 0 = 100)
    paddingNum = Number(padding);

    SelectForwardLayer ();

    //getting width, height, position of layer above original layer
    var doc = app.activeDocument;  
    var layer = doc.activeLayer;
    var bounds = app.activeDocument.activeLayer.bounds; 
    targetWidth = bounds[2].as('px')-bounds[0].as('px');  
    targetHeight = bounds[3].as('px')-bounds[1].as('px');
    targetWidth = targetWidth + paddingNum;
    targetHeight = targetHeight + paddingNum;
    targetXpos = (layer.bounds[0].value + layer.bounds[2].value)/2;
    targetYpos = (layer.bounds[1].value + layer.bounds[3].value)/2;

    // alert ("padding = " + padding);

    // alert("original dimensions:" + originalWidth + "x" + originalHeight + "target dimensions:" + targetWidth + "x" + targetHeight) ;

    SelectBackwardLayer () ;

    SetLayerSize () ;

    positionLayer (doc.activeLayer, targetXpos, targetYpos);



    }

//=======================================================

function selectFront() 
    {

    // Alt+. shortcut select ftont visible layer

    var idslct = charIDToTypeID( "slct" );

        var desc250 = new ActionDescriptor();

        var idnull = charIDToTypeID( "null" );

            var ref207 = new ActionReference();

            var idLyr = charIDToTypeID( "Lyr " );

            var idOrdn = charIDToTypeID( "Ordn" );

            var idFrnt = charIDToTypeID( "Frnt" );

            ref207.putEnumerated( idLyr, idOrdn, idFrnt );

        desc250.putReference( idnull, ref207 );

        var idMkVs = charIDToTypeID( "MkVs" );

        desc250.putBoolean( idMkVs, false );

    executeAction( idslct, desc250, DialogModes.NO );

    }

//=======================================================

function positionLayer( lyr, x, y )
    {// layerObject, Number, Number  
         // if can not move layer return  
         if(lyr.iisBackgroundLayer||lyr.positionLocked) return  
         // get the layer bounds  
         var layerBounds = lyr.bounds;  
         // get top left position  
         var layerX = (layerBounds[0].value + layerBounds[2].value)/2;  
         var layerY = (layerBounds[1].value + layerBounds[3].value)/2;  
         // the difference between where layer needs to be and is now  
         var deltaX = x-layerX;  
         var deltaY = y-layerY;  
         // move the layer into position  
         lyr.translate (deltaX, deltaY);  
    }  

//=======================================================

function SetLayerSize ()
    {
    resizePercentX = targetWidth/originalWidth*100
    resizePercentY = targetHeight/originalHeight*100
    app.activeDocument.activeLayer.resize(resizePercentX,resizePercentY,AnchorPosition.MIDDLECENTER);
    // alert (resizePercentX + resizePercentY);

    }

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