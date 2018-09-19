//make selected layer as wide as the canvas while maintining layer's proportion. -MH 9/18/18



    var maintainAspectRatio = true;// set to true to keep aspect ratio  
    if(app.documents.length>0){  
        app.activeDocument.suspendHistory ('Fit Layer to Canvas WIDTH', 'FitLayerToCanvas('+maintainAspectRatio+')');  
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
              
        // move the layer so top left corner matches canvas top left corner  
        layer.translate(new UnitValue(0-layer.bounds[0].as('px'),'px'), new UnitValue(0-layer.bounds[1].as('px'),'px'));  

        if( !keepAspect ){  
            // scale the layer to match canvas  
            layer.resize( (width/layerWidth)*100,(height/layerHeight)*100,AnchorPosition.TOPLEFT);  
        }else{  
            var layerRatio = layerWidth / layerHeight;  
            var newWidth = width;  
            var newHeight = ((1.0 * width) / layerRatio);  
            // if (newHeight >= height) {  
            //     newWidth = layerRatio * height;  
            //     newHeight = height;  
            // }  
            var resizePercent = newWidth/layerWidth*100;  
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

// FitLayerToCanvas();
