//Resizes a layer to the canvas such that it covers the whole canvas. works on portrait and landscape images. -MH 9/19/18



    var maintainAspectRatio = true;// set to true to keep aspect ratio  
    if(app.documents.length>0){  
        app.activeDocument.suspendHistory ('Fits like a glove!', 'FitLayerToCanvas('+maintainAspectRatio+')');  
    }  
    function FitLayerToCanvas( keepAspect ){// keepAspect:Boolean - optional. Default to false  
        var doc = app.activeDocument;  
        var layer = doc.activeLayer;  
        // do nothing if layer is background or locked  
        if(layer.isBackgroundLayer || layer.allLocked || layer.pixelsLocked  
                                || layer.positionLocked || layer.transparentPixelsLocked ) return;  
        // do nothing if layer is not normal artLayer or Smart Object  
        if( layer.kind != LayerKind.NORMAL && layer.kind != LayerKind.SMARTOBJECT) return;  
        // store the ruler  
        var defaultRulerUnits = app.preferences.rulerUnits;  
        app.preferences.rulerUnits = Units.PIXELS;  
          
        var width = doc.width.as('px');  
        var height =doc.height.as('px');  
        var bounds = app.activeDocument.activeLayer.bounds;  
        var layerWidth = bounds[2].as('px')-bounds[0].as('px');  
        var layerHeight = bounds[3].as('px')-bounds[1].as('px');
        var documentRatio = width/height;
        var layerRatio = layerWidth / layerHeight; 
              
        // move the layer so top left corner matches canvas top left corner  
        layer.translate(new UnitValue(0-layer.bounds[0].as('px'),'px'), new UnitValue(0-layer.bounds[1].as('px'),'px'));  

      if(documentRatio>layerRatio)
            {
                //fit to width
             
            var newWidth = width;  
            var newHeight = ((width) / layerRatio);   
            var resizePercent = newWidth/layerWidth*100;  
            app.activeDocument.activeLayer.resize(resizePercent,resizePercent,AnchorPosition.TOPLEFT);  
            }
        else
            {
                //fit to height
            //sets the new layer width var to the doc width in px
            var newWidth = layerRatio * height;   
            //sets the new layer height var to proper amount using the ratio
            var newHeight = height; 
            //converts pixel values into a percentage for the transform
            var resizePercent = newWidth/layerWidth*100;  
            //resizes the image that amount
            app.activeDocument.activeLayer.resize(resizePercent,resizePercent,AnchorPosition.TOPLEFT);  
            }
        // restore the ruler  
        app.preferences.rulerUnits = defaultRulerUnits; 
        CenterLayer();
 
    }  



    function CenterLayer() {
        // declare local variables
        var doc = activeDocument;
        var layer = doc.activeLayer;
        var bounds = layer.bounds;

        // check if Background layer is selected
        if (layer.isBackgroundLayer) {
            alert("The Background layer can't be centered.\n" +
                'Please select another layer and try again.', 'Background Layer', false);
            return;
        }
        
        // check if current layer contains artwork
        if (bounds[0] == bounds[2]) {
            alert('The current layer contains no artwork.\n' +
                'Please select another layer and try again.', 'Empty Layer', false);
            return;
        }
        
        // check if a group (layer set) is selected; prompt to center entire group
        if (layer.typename == 'LayerSet' && !confirm('Are you sure you want to center the entire group?', false, 'Center Entire Group?')) {
            return;
        }
        
        // set document resolution to 72 ppi (required for CS2)
        var res = doc.resolution;
        doc.resizeImage(undefined, undefined, 72, ResampleMethod.NONE);

        // remember layer lock state
        var allLock = layer.allLocked; 
        var posLock = layer.positionLocked;

        // unlock layer
        layer.allLocked = false;
        layer.positionLocked = false;

        // get doc dimensions
        // BUG: both width and height will be off by +2 px for shape layers
        // NOTE: layers with styles might not be centered correctly
        var docWidth = Number(doc.width);
        var docHeight = Number(doc.height);

        // get layer dimensions
        var layerWidth = Number(bounds[2] - bounds[0]);
        var layerHeight = Number(bounds[3] - bounds[1]);

        // calculate offsets
        var dX = (docWidth - layerWidth) / 2 - Number(bounds[0]);
        var dY = (docHeight - layerHeight) / 2 - Number(bounds[1]);

        // centers the active layer
        layer.translate(dX, dY);

        // restore original document resolution (required for CS2)
        doc.resizeImage(undefined, undefined, res, ResampleMethod.NONE);

        // restore original layer lock state
        layer.allLocked = allLock;
        layer.positionLocked = posLock;
    }


