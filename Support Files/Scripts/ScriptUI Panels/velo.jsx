function AddVelo(thisObj)
{
    var name = "AddVelo";
    var version = "v1.0";
    var gmzScript = 'velo = effect("velocity")("Slider");\
    ofs = effect("offset")("Slider");\
    n = velo.numKeys;\
    if (n > 0 && velo.key(1).time < time)\
    {\
        clc = velo.key(1).value*(velo.key(1).time - inPoint);\
        for (i = 2; i <= n; i++)\
        {\
            if (velo.key(i).time > time) break;\
            k1 = velo.key(i-1);\
            k2 = velo.key(i);\
            v2 = velo.valueAtTime(k2.time-.001);\
            clc += (k1.value + v2)*(k2.time - k1.time)/2;\
        }\
        clc += (velo.value + velo.key(i-1).value)*(time - velo.key(i-1).time)/2;\
    }\
    else\
    {\
        clc = velo.value*(time - inPoint);\
    }\
    ((value + clc)/100+ofs/1000);\
    //youtube.com/gmzorz';

    function buildUI(thisObj)
    {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", name + " " + version, undefined, {resizeable:true});
        
        res = "group\
            {\
                orientation:'column',  alignment:['fill','center'], alignChildren:['fill','fill'],\
                groupZero: Group\
                {\
                    orientation:'column', alignChildren:['fill','center'],\
                    buttonAdd: Button{text: 'Add Velocity'}\
                }\
                groupOne: Group\
                {\
                    orientation:'column',\
                    staticText1: StaticText{text: 'Expression: youtube.com/gmzorz'},\
                    staticText2: StaticText{text: 'UI script: youtube.com/1suky1'},\
                }\
            }";
        
        myPanel.grp = myPanel.add(res);

        myPanel.layout.layout(true);
        myPanel.grp.minimumSize = myPanel.grp.size;
        
        myPanel.layout.resize();
        myPanel.onResizing = myPanel.onResize = function()
        {
            this.layout.resize();
        }

        myPanel.grp.groupZero.buttonAdd.onClick = function()
        {
            AddVeloToLayer();
        }

        myPanel.layout.layout(true);
        return myPanel;    
    }

    function AddVeloToLayer()
    {
        app.beginUndoGroup("Adding Velocity");

        var layers = app.project.activeItem.selectedLayers;

        for(var i = 0; i < layers.length; i++)
        {
            var slider1 = layers[i].Effects.addProperty("Slider Control");
            slider1.name = "velocity"; 
            slider1.property("Slider").setValue(100);
            var slider2 = layers[i].Effects.addProperty("Slider Control");
            slider2.name = "offset";

            layers[i].timeRemapEnabled = true;
            var timeRemap = layers[i].property("Time Remap");
            if(timeRemap.canSetExpression)
            {
                timeRemap.expression = gmzScript;
            }
        }

        app.endUndoGroup();
    }

    var myScriptPal = buildUI(thisObj);
   
    if((myScriptPal != null) && (myScriptPal instanceof Window))
    {
        myScriptPal.center();
        myScriptPal.show();
    }   
    
    if(this instanceof Panel)
        myScriptPal.show();  
}
AddVelo(this);
AddVelo.jsx