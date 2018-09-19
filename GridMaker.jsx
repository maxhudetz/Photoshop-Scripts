//makes a grid that perfectly matches document width. option to resize the document to perfectly match grid height by rounding to nearest grid square.



app.activeDocument.suspendHistory ('Fitting grid to canvas...', 'Main()');


function Main ()
	{
		// set ruler units to pixels
		var defaultRulerUnits = app.preferences.rulerUnits;
		preferences.rulerUnits = Units.PIXELS;


		doc = activeDocument;
		docWidth = doc.width.as('px');  
		docHeight =doc.height.as('px');


		numSquares = prompt("How many grid squares wide?", "10");
		//check is number
		if (isNaN(numSquares))
		{
			alert ("numbers only please");
			return;
		}


		numSubdivisions = prompt ("How many subdivisions?", "1");
		//check is number
		if (isNaN(numSubdivisions))
		{ 
			alert ("numbers only please");
			return;
		}

		resizeDoc = prompt ("resize doc height to fit grid perfectly? y/n", "n")

		//can do this right from code
		app.preferences.gridSubDivisions = numSubdivisions;

		squareSize = docWidth/numSquares;

		//needed to use script listener for this
		SetGuides (squareSize);

		//check if we said to make height fit perfectly. if so, do that
		if (resizeDoc == "y" || resizeDoc == "Y")
		{
			//determine number of vertical squares there would be
			verticalSquares = docHeight/squareSize;
			//round that number so it's a whole square
			verticalSquares = Math.round(verticalSquares);
			//multiply vertical squares by how big squares are
			newDocVertSize = verticalSquares*squareSize
			//then we resize the canvas
			app.activeDocument.resizeCanvas (docWidth, newDocVertSize);
		}

		//restore ruler units
		app.preferences.rulerUnits = defaultRulerUnits; 


	}

function SetGuides(guideSize)
	{
	var idsetd = charIDToTypeID( "setd" );
    var desc11 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref3 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idGdPr = charIDToTypeID( "GdPr" );
        ref3.putProperty( idPrpr, idGdPr );
        var idcapp = charIDToTypeID( "capp" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref3.putEnumerated( idcapp, idOrdn, idTrgt );
    desc11.putReference( idnull, ref3 );
    var idT = charIDToTypeID( "T   " );
        var desc12 = new ActionDescriptor();
        var idGrdM = charIDToTypeID( "GrdM" );
        desc12.putDouble( idGrdM, guideSize);
        var idGrdt = charIDToTypeID( "Grdt" );
        var idRlrU = charIDToTypeID( "RlrU" );
        var idRrPx = charIDToTypeID( "RrPx" );
        desc12.putEnumerated( idGrdt, idRlrU, idRrPx );
    var idGdPr = charIDToTypeID( "GdPr" );
    desc11.putObject( idT, idGdPr, desc12 );
	executeAction( idsetd, desc11, DialogModes.NO );


	}

