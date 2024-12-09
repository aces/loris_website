/*
* This code was mostly written by
* Esa and the source can be seen here
* http://koti.mbnet.fi/ojalesa/boundsbox/makemarker_sidebar.htm
* The page styles and some additional code
* was written by Derek
* http://3design-dlo.com
*/

google.maps.event.addDomListener(window, 'load', init);

function init() {

/**
 * map 
 */  
var mapOpts = {
  mapTypeId: google.maps.MapTypeId.ROADMAP,


/* map style */
  styles: [
      {
          "featureType": "water",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#b5cbe4"
              }
          ]
      },
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "color": "#efefef"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#83a5b0"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#bdcdd3"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#e3eed3"
              }
          ]
      },
      {
          "featureType": "administrative",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 33
              }
          ]
      },
      {
          "featureType": "road"
      },
      {
          "featureType": "poi.park",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {},
      {
          "featureType": "road",
          "stylers": [
              {
                  "lightness": 20
              }
          ]
      }
  ],

  center: new google.maps.LatLng(45.510205, -73.580565),
  zoom: 2,
  zoomControl: true,
  zoomControlOptions: {
  style: google.maps.ZoomControlStyle.SMALL,
  },
  disableDoubleClickZoom: true,
  mapTypeControl: true,
  mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
  },
  scaleControl: true,
  scrollwheel: false,
  panControl: true,
  streetViewControl: true,
  draggable : true,
  overviewMapControl: true,
  overviewMapControlOptions: {
      opened: false,
  }
}

var map = new google.maps.Map(document.getElementById("map"), mapOpts);
//  We set zoom and center later by fitBounds()



/**
 * makeMarker() ver 0.2
 * creates Marker and InfoWindow on a Map() named 'map'
 * creates sidebar row in a DIV 'sidebar'
 * saves marker to markerArray and markerBounds
 * @param options object for Marker, InfoWindow and SidebarItem
 * @author Esa 2009
 */

var infoWindow = new google.maps.InfoWindow({maxWidth:250});
var markerBounds = new google.maps.LatLngBounds();
var markerArray = [];
 
function makeMarker(options){
  var pushPin = new google.maps.Marker({map:map});
  pushPin.setOptions(options);
  google.maps.event.addListener(pushPin, "click", function(){
    infoWindow.setOptions(options);
    infoWindow.open(map, pushPin);
    if(this.sidebarButton)this.sidebarButton.button.focus();
  });
  var idleIcon = pushPin.getIcon();
  if(options.sidebarItem){
    pushPin.sidebarButton = new SidebarItem(pushPin, options);
    pushPin.sidebarButton.addIn("sidebar");
  }
  markerBounds.extend(options.position);
  markerArray.push(pushPin);
  return pushPin;
}

google.maps.event.addListener(map, "click", function(){
  infoWindow.close();
});


/**
 * Creates an sidebar item 
 * @constructor
 * @author Esa 2009
 * @param marker
 * @param options object Supported properties: sidebarItem, sidebarItemClassName, sidebarItemWidth,
 */
function SidebarItem(marker, opts){
  var tag = opts.sidebarItemType || "button";
  var row = document.createElement(tag);
  row.innerHTML = opts.sidebarItem;
  row.className = opts.sidebarItemClassName || "sidebar_item";  
  row.style.display = "block";
  row.style.width = opts.sidebarItemWidth || "100%";
  row.onclick = function(){
    google.maps.event.trigger(marker, 'click');
  }
  row.onmouseover = function(){
    google.maps.event.trigger(marker, 'mouseover');
  }
  row.onmouseout = function(){
    google.maps.event.trigger(marker, 'mouseout');
  }
  this.button = row;
}
// adds a sidebar item to a <div>
SidebarItem.prototype.addIn = function(block){
  if(block && block.nodeType == 1)this.div = block;
  else
    this.div = document.getElementById(block)
    || document.getElementById("sidebar")
    || document.getElementsByTagName("body")[0];
  this.div.appendChild(this.button);
}
// deletes a sidebar item
SidebarItem.prototype.remove = function(){
  if(!this.div) return false;
  this.div.removeChild(this.button);
  return true;
}



/**
 * markers and info window contents
 * copy/paste entries to create new ones
 * 
 */

/* this variable is for 
* the pins on the map. 
* Any icon can be used by changing the source. 
* If left blank, it will use the default google maps pins.
* var image = '';
*/

/* 
* this is an icon of a db
*/
/*var image = '../images/mini-db.png';*/
var image = '';

/*
* this variable sets the 
* content inside the container window

var contentString = 
      '<div>'+
      '<img src=" url here " class="logo">'+
      '<h1> HEADER HERE </h1>'+
      '<p><b> Name of Inst. </b> description here.</p>'+
      '<p>Website: <a href=" url of inst. " target="blank"> url </a></p>'+
      '</div>';

* this makes the marker on the map as well as the sidebar      
makeMarker({

  * the lat/long can be obtained on
  * google maps br right clicking the
  * location on the map and selecting 'what's here'

  position: new google.maps.LatLng(45.5089835, -73.5813425),
  title: "Neuro",
  sidebarItem: "Neuro",
  content: contentString,
  icon: image
}); 
*/

var contentString = 
      '<div>'+
      '<img src="http://www.mcgill.ca/neuro/files/neuro/neurotext_final_0.gif" class="logo">'+
      '<h1>The Neuro</h1>'+
      '<p><b>The Neuro</b> is located in Montreal Canada and is the development center for LORIS.</p>'+
      '<p>Website: <a href="http://mcin-cnim.ca" target="blank">mcin-cnim.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(45.5089835, -73.5813425),
  title: "Montreal Neuro",
  sidebarItem: "Montreal Neuro",
  content: contentString,
  icon: image
});   

var contentString = 
      '<div>'+
      '<img src="http://douglasbrainbank.ca/img/douglas-logo.jpg" class="logo">'+
      '<h1>Douglas Mental Health University Institute</h1>'+
      '<p><b>The Douglas Mental Health</b> University Institute is located in Montreal Canada.</p>'+
      '<p>Website: <a href="http://www.douglas.qc.ca/" target="blank">douglas.qc.ca/</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(45.442508, -73.584851),
  title: "Douglas Mental Health University Institute",
  sidebarItem: "Douglas Hospital",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://ccna-ccnv.ca/wp-content/uploads/2015/06/CCNA_title1.png" class="logo">'+
      '<h1>The CCNA</h1>'+
      '<p><b>The Canadian Consortium on Neurodegeneration in Aging (CCNA)</b> provides the infrastructure and support that facilitates collaboration amongst Canada’s top dementia researchers. By accelerating the discovery, innovation, and the adoption of new knowledge, the CCNA positions Canada as a global leader in increasing understanding of neurodegenerative diseases, working towards prevention, and improving the quality of life of those living with dementia.</p>'+
      '<p>Website: <a href="http://ccna-ccnv.ca/en/" target="blank">ccna-ccnv.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(45.420477, -75.701056),
  title: "Canadian Consortium on Neurodegeneration in Aging (CCNA)",
  sidebarItem: "Canadian Consortium on Neurodegeneration in Aging (CCNA)",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.cima-q.ca/ressources/images/logocimaq.png" class="logo">'+
      '<h1>CIMA-Q</h1>'+
      "<p><b>Consortium pour l'Identification précoce de la Maladie d'Alzheimer (CMA-Q)</b> regroupe plus de 90 chercheurs et cliniciens québécois qui ont comme objectif commun de faire avancer les connaissances sur la maladie d'Alzheimer. </p>"+
      '<p>Website: <a href="http://www.cima-q.ca/" target="blank">www.cima-q.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(45.491389, -73.623308),
  title: "Consortium pour l'Identification précoce de la Maladie d'Alzheimer",
  sidebarItem: "CIMA-Q",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://rpq-qpn.ca/en/wp-content/uploads/2014/05/Logo-Quebec-Parkinson-Network.png" class="logo">'+
      '<h1>Quebec Parkinson Network</h1>'+
      "<p><b>Quebec Parkinson Network</b> allows researchers, clinicians and patients to regroup. Promoting collaboration of different actors in the fight against Parkinson's disease, the Network wants to be the new leader of the research on the disease.</p>"+
      '<p>Website: <a href="http://rpq-qpn.ca/en/" target="blank">rpq-qpn.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(45.509167, -73.581361),
  title: "Quebec Parkinson Network",
  sidebarItem: "Quebec Parkinson Network",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.fz-juelich.de/SiteGlobals/StyleBundles/Bilder/NeuesLayout/logo.gif;jsessionid=2A49E35ECA31A04A76B23FC867C83FE2?__blob=normal" class="logo">'+
      '<h1>BigBrain Project</h1>'+
      '<p><b>The BigBrain Project</b> is a 3D model of a human brain in extremely high resolution. This reconstruction is a free tool, and offers matchless neuroanatomical insight as well as the possibility to verify hypotheses.</p>'+
      '<p>Website: <a href="http://www.fz-juelich.de/inm/inm-1/EN/Forschung/_docs/BigBrain/bigbrain_node.html" target="blank">http://www.fz-juelich.de/</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(50.922477, 6.361087),
  title: "BigBrain Project",
  sidebarItem: "BigBrain Project",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.sickkids.ca/resources/hospital/images/logos/sickkids.gif" class="logo">'+
      '<h1>Sick Kids Hospital</h1>'+
      '<p><b>Sick Kids</b> is located in Toronto Canada.</p>'+
      '<p>Website: <a href="http://www.sickkids.ca/" target="blank">www.sickkids.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(43.657299, -79.3873968),
  title: "Sick Kids",
  sidebarItem: "Sick Kids",
  content: contentString,
  icon: image
});   

var contentString = 
      '<div>'+
      '<img src="http://www.queensu.ca/sites/all/themes/queensbase_omega/images/wordmark.png" class="logo">'+
      "<h1>Queens's University</h1>"+
      "<p><b>Queen's University</b> is located in Kingston Canada.</p>"+
      '<p>Website: <a href="http://queensu.ca/" target="blank">queensu.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(44.225572, -76.495506),
  title: "Queen's University",
  sidebarItem: "Queen's University",
  content: contentString,
  icon: image
});  

var contentString = 
      '<div>'+
      '<img src="http://www.neurodevnet.ca/sites/all/themes/NeuroDevNet2010/images/neurodevnet-logo.jpg" class="logo">'+
      '<h1>NeuroDevNet</h1>'+
      '<p><b>NeuroDevNet</b>, a Canadian Network of Centres of Excellence (NCE), is dedicated to understanding brain development and to helping children and their families overcome the challenges of neurodevelopmental disorders.</p>'+
      '<p>Website: <a href="http://www.neurodevnet.ca/" target="blank">www.neurodevnet.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(49.246448, -123.127554),
  title: "NeuroDevNet",
  sidebarItem: "NeuroDevNet",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://adni.loni.usc.edu/wp-content/themes/freshnews-dev-v2/images/logo-adni.png" class="logo">'+
      '<h1>Alzheimer’s Disease Neuroimaging Initiative </h1>'+
      '<p><b>Alzheimer’s Disease Neuroimaging Initiative</b> unites researchers with study data as they work to define the progression of Alzheimer’s disease. ADNI researchers collect, validate and utilize data such as MRI and PET images, genetics, cognitive tests, CSF and blood biomarkers as predictors for the disease..</p>'+
      '<p>Website: <a href="http://adni.loni.usc.edu/" target="blank">adni.loni.usc.edu</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(32.749280, -116.496770),
  title: "ADNI",
  sidebarItem: "ADNI",
  content: contentString,
  icon: image
});  

var contentString = 
      '<div>'+
      '<img src="http://www.ibis-network.org/Images/TitleBarNavigateSM-ACE.gif" class="logo">'+
      '<h1>IBIS Seattle</h1>'+
      '<p><b>Infant Brain Imaging Study (IBIS)</b> is a project to increase our understanding of the timing and pattern of brain development in very young children with autism. </p>'+
      '<p>Website: <a href="http://www.ibis-network.org/" target="blank">ibis-network.org</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(47.599949, -122.339345),
  title: "IBIS Seattle",
  sidebarItem: "IBIS Seattle",
  content: contentString,
  icon: image
});

var contentString = 
      '<div>'+
      '<img src="http://www.ibis-network.org/Images/TitleBarNavigateSM-ACE.gif" class="logo">'+
      '<h1>IBIS St Louis</h1>'+
      '<p><b>Infant Brain Imaging Study (IBIS)</b> is a project to increase our understanding of the timing and pattern of brain development in very young children with autism. </p>'+
      '<p>Website: <a href="http://www.ibis-network.org/" target="blank">ibis-network.org</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(38.621167, -90.192309),
  title: "IBIS St Louis",
  sidebarItem: "IBIS St Louis",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.ibis-network.org/Images/TitleBarNavigateSM-ACE.gif" class="logo">'+
      '<h1>IBIS North Carolina</h1>'+
      '<p><b>Infant Brain Imaging Study (IBIS)</b> is a project to increase our understanding of the timing and pattern of brain development in very young children with autism. </p>'+
      '<p>Website: <a href="http://www.ibis-network.org/" target="blank">ibis-network.org</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(35.230349, -80.834388),
  title: "IBIS North Carolina",
  sidebarItem: "IBIS North Carolina",
  content: contentString,
  icon: image
});  
   
var contentString = 
      '<div>'+
      '<img src="http://pediatricmri.nih.gov/nihpd/info/Images/sub_pages_logo.jpg" class="logo">'+
      '<h1>NIH Paediatric Database</h1>'+
      '<p><b>NIH</b> MRI Study of Normal Pediatric Development.</p>'+
      '<p>Website: <a href="http://pediatricmri.nih.gov" target="blank">pediatricmri.nih.gov</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(39.291661, -105.760953),
  title: "NIH Paediatric Database",
  sidebarItem: "NIH Paediatric Database",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="https://www.humanbrainproject.eu/image/company_logo?img_id=10795&t=1441492532899" class="logo">'+
      '<h1>Human Brain Project</h1>'+
      '<p><b>Human Brain Project</b> is part of the European Commission and is centered in Geneva Switzerland.</p>'+
      '<p>Website: <a href="https://www.humanbrainproject.eu/" target="blank">humanbrainproject.eu</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(46.226888, 6.148227),
  title: "Human Brain Project",
  sidebarItem: "Human Brain Project",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://fcon_1000.projects.nitrc.org/indi/abide/abide_logo2.jpg" class="logo">'+
      '<h1>ABIDE</h1>'+
      '<p><b>The Autism Brain Imaging Data Exchange (ABIDE)</b> provides previously collected resting state functional magnetic resonance imaging (R-fMRI) datasets from 539 individuals with ASD and 573 typical controls for the purpose of data sharing in the broader scientific community. </p>'+
      '<p>Website: <a href="http://fcon_1000.projects.nitrc.org/indi/abide/" target="blank">ABIDE website</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(42.358780, -71.059905),
  title: "ABIDE",
  sidebarItem: "ABIDE",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://en.kisti.re.kr/media/tpl/common/logo-kisti.jpg" class="logo">'+
      '<h1>Korean Institute of Science and Technology</h1>'+
      '<p><b>Korean Institute of Science and Technology</b> is located in Seoul Korea.</p>'+
      '<p>Website: <a href="http://en.kisti.re.kr/" target="blank">en.kisti.re.kr</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(37.591091, 127.045123),
  title: "Korean Institute of Science and Technology",
  sidebarItem: "Korean Institute of Science and Technology",
  content: contentString,
  icon: image
});  

var contentString = 
      '<div>'+
      '<img src="http://www.nbrc.ac.in/picgal/logo/logonew_02.png" class="logo">'+
      '<h1>National Brain Research Centre</h1>'+
      '<p><b>National Brain Research Centre</b> is the only institute in India dedicated to neuroscience research and education. Scientists and students of NBRC come from diverse academic backgrounds, including biological, computational, mathematical, physical, engineering and medical sciences, and use multidisciplinary approaches to understand the brain. </p>'+
      '<p>Website: <a href="http://www.nbrc.ac.in/" target="blank">www.nbrc.ac.in</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(28.332309, 76.938559),
  title: "NATIONAL BRAIN RESEARCH CENTRE",
  sidebarItem: "National Brain Research Centre",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.eur.nl/fileadmin/templates/fabrique/img/logo.png" class="logo">'+
      '<h1>Erasmus University</h1>'+
      '<p><b>Erasmus University</b> is located in Rotterdam Netherlads</p>'+
      '<p>Website: <a href="http://www.eur.nl/" target="blank">www.eur.nl</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(51.917915, 4.526206),
  title: "Erasmus University",
  sidebarItem: "Erasmus University",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.bioeng.nus.edu.sg/cfa/images/nuslogo.png" class="logo">'+
      '<h1>National University of Singapore: GUSTO</h1>'+
      "<p><b>The GUSTO project</b> focuses on the relation between fetal development and the risks for obesity and metabolic dysfunction as well as psychopathology. GUSTO involves a partnership of two academic research centers, National University of Singapore (NUS) and Singapore Institute for Clinical Sciences (SICS) with two child health centers; National University Hospital (NUH) and Kandang Kerbau Women's and Children's Hospital (KKH). </p>"+
      '<p>Website: <a href="http://www.bioeng.nus.edu.sg/cfa/gusto.html" target="blank">www.bioeng.nus.edu.sg</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(1.296578, 103.776297),
  title: "National University of Singapore",
  sidebarItem: "National University of Singapore: GUSTO",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.uvm.edu/sites/all/themes/uvmbase/images/uvmlogo2014.svg" class="logo">'+
      '<h1>The University of Vermont</h1>'+
      "<p><b>The University of Vermont</b> is locoated in Burlington Vermont.</p>"+
      '<p>Website: <a href="http://www.uvm.edu" target="blank">www.uvm.edu</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(44.477837, -73.196635),
  title: "University of Vermont",
  sidebarItem: "University of Vermont",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.fz-juelich.de/SiteGlobals/StyleBundles/Bilder/NeuesLayout/logo.gif?__blob=normal" class="logo">'+
      '<h1>1000 Gehirne</h1>'+
      "<p><b>1000 BRAINS</b> is a study on brain ageing and related interindividual variability.</p>"+
      '<p>Website: <a href="http://www.fz-juelich.de/inm/inm-1/DE/Forschung/1000_Gehirne_Studie/1000_Gehirne_Studie_node.html" target="blank">www.fz-juelich.de</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(50.922477, 6.361087),
  title: "1000 BRAINS ",
  sidebarItem: "1000 BRAINS ",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.mcgill.ca/sites/all/themes/blofeld/images/logo_red.png" class="logo">'+
      '<h1>The Open MEG Archive (OMEGA)</h1>'+
      "<p><b>The Open MEG Archive (OMEGA)</b> is the fruit of a collaborative effort by the McConnell Brain Imaging Centre and the Université de Montréal to build a centralised repository in which to regroup MEG data in raw and processed form, for open dissemination.</p>"+
      '<p>Website: <a href="https://www.mcgill.ca/bic/resources/omega" target="blank">www.mcgill.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(45.504717, -73.577130),
  title: "OMEGA",
  sidebarItem: "OMEGA",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.braininstitute.ca/sites/all/themes/obi_revision/img/logo-revision.png" class="logo">'+
      '<h1>Ontario Brain Institute</h1>'+
      "<p><b>Ontario Brain Institute</b> The Ontario Brain Institute is a provincially‐funded, not‐for‐profit research centre seeking to maximize the impact of neuroscience and establish Ontario as a world leader in brain research, commercialization and care. </p>"+
      '<p>Website: <a href="http://www.braininstitute.ca/" target="blank">www.braininstitute.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(43.654639, -79.388779),
  title: "Ontario Brain Institute",
  sidebarItem: "Ontario Brain Institute",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.ccmu.edu.cn/images/sylogo.gif" class="logo">'+
      '<h1>Capital Medical University</h1>'+
      "<p><b>Capital Medical University</b> is part of the CanadaChina project and is located in Beijing China. </p>"+
      '<p>Website: <a href="http://www.ccmu.edu.cn/" target="blank">www.ccmu.edu.cn</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(39.867886, 116.353041),
  title: "Capital Medical University",
  sidebarItem: "Capital Medical University Beijing",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.ualberta.ca/~publicas/uofa/img/logo.svg" class="logo">'+
      '<h1>University of Alberta</h1>'+
      "<p><b>The University of Alberta</b> is located in Edmonton Alberta. </p>"+
      '<p>Website: <a href="https://ualberta.ca/" target="blank">ualberta.ca</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(53.523442, -113.525954),
  title: "University of Alberta",
  sidebarItem: "University of Alberta",
  content: contentString,
  icon: image
}); 

var contentString = 
      '<div>'+
      '<img src="http://www.ed.ac.uk/sites/all/themes/uoe/assets/logo.png" class="logo">'+
      '<h1>The University of Edinburgh - Centre for Clinical Brain Sciences</h1>'+
      '<p><b>The Centre for Clinical Brain Sciences</b> is located in the University of Edinburgh.</p>'+
      '<p>Website: <a href="http://www.ed.ac.uk/clinical-brain-sciences" target="blank">ed.ac.uk</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(55.945446, -3.189049),
  title: "The University of Edinburgh - Centre for Clinical Brain Sciences",
  sidebarItem: "U of Edinburgh",
  content: contentString,
  icon: image
});  

var contentString = 
      '<div>'+
      '<img src="http://www.bnu.edu.cn/3/imgs/BNU-logo.png" class="logo">'+
      '<h1>He Lab @ Beijing Normal University</h1>'+
      '<p><b>The He Lab</b> is located at the Beijing Normal University.</p>'+
      '<p>Website: <a href="http://helab.bnu.edu.cn/" target="blank">helab.bnu.edu.cn</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(39.962348, 116.366180),
  title: "He Lab @ BNU",
  sidebarItem: "He Lab",
  content: contentString,
  icon: image
});  

var contentString = 
      '<div>'+
      '<img src="http://www.cneuro.cu/templates/vt_science/css/styles/vt_logo_style4.png" class="logo">'+
      '<h1>CNEURO</h1>'+
      '<p><b>The Cuban Neurosciences Center (CNEURO)</b> is located in Havana, Cuba.</p>'+
      '<p>Website: <a href="http://www.cneuro.cu/" target="blank">cneuro.cu</a></p>'+
      '</div>';
makeMarker({
  position: new google.maps.LatLng(23.075083, -82.456609),
  title: "The Cuban Neurosciences Center",
  sidebarItem: "CNEURO",
  content: contentString,
  icon: image
});  

/**
 *   fit viewport to markers
 * commented out as the map is set to focus on the center of the atlantic ocean.
 */

/*map.fitBounds(markerBounds);*/

}

