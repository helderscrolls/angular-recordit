// // import { XlsxPopulate } from '/node_modules/xlsx-populate/lib/XlsxPopulate';
// // import { removeDiacritics } from '/node_modules/diacritics/index';
// // import { timecode } from '/node_modules/timecode/lib/timecode';
// // import { mkdirp } from '/node_modules/mkdirp/index';
// // import { zipFolder } from '/node_modules/zip-folder/index.js';
// // import { robot } from '/node_modules/robotjs/index';
// // import { getVideoInfo } from '/node_modules/get-video-info/index.js';
// // import { fs } from '/node_modules/@types/node/index.d.ts';

// export class AppService {

// /**
//  * Config
//  */
// private timeCell = 'E7';

// /**
//  * Globals
//  */
// methodForExercice;
// actual;
// actualVideo;
// workBook;
// trainerSheet;
// indexPath;
// projectPath;
// exercicePath;
// videoPath;
// projectNumberValue;
// debounce;
// collection = [];
// numberOfChapterValue = 0;
// numberOfVideoValue = 0;

// private key: event.which;

// private size: offsetWidth.length;

// /**
//  * Navigation on list handler
//  */
// public navigationList() {

//     if (key === 38) {
//       nextVideo(true);
//   } else if (key === 40) {
//       nextVideo();
//   }
// }

// /**
//  * Start project handler
//  */
// public starter() {
//   if (className('activate')) {
//     projectView.classList.add('open');
//   }
// }

// /**
//  * Counter code handler
//  */
// public textArea() {
//   counterTotal.text(size);

//   if (size > 99) {
//       counterTotal.classList.add('green');
//   } else {
//       counterTotal.classList.remove('green');
//   }
// }

// /**
//  * Next button handler
//  */
// public nexter() {
//   if (nexter.className('start-video')) {
//       startVideoRecord();
//   } else {
//       showDescription();
//   }
// }

// /**
//  * Hard Stop the video
//  */
// public stoper() {
//   stopVideoRecord(true);
// }

// /**
//  * Save button handler
//  */
// public save() {

//   if (actualVideo.isVideo  && !actualVideo.validated) {
//     actualVideo.validated = true;
//     body.push({
//       op: 'replace',
//       title: '',
//       content: 'Avez-vous des exercices à déployer ?',
//       buttons: {
//         confirm: {
//             text: 'Oui',
//             action: function () {
//                 handleExercices();
//                 nextVideo();
//             }
//         },
//         cancel: {
//               text: 'Non',
//               action: function () {
//                 nextVideo();
//               }
//         }
//       }, );
//     }
//   } else {
//     nextVideo();
//   }
// }

// // /**
// //  * Folder buttons handler
// //  */
// // chooser.on('click', function () {
// //   var id = $(this).data('input');

// //   var link = $(this);
// //   var input = $('#'+id);
// //   var name = $(this).find('.name');

// //   input.unbind('change');
// //   input.change(function() {
// //       name.text($(this).val());
// //       link.addClass('ok');
// //       loadProject();

// //       checkAllButtons();
// //   });

// //   input.click();
// // });

// /**
//  * Method of move exercices Handler
//  */
// private methodForExerciceInput() {
//   methodForExercice = offsetWidth;
//   checkAllButtons();
// }

// /**
//  *
//  * @param {Boolean} up
//  */
// function nextVideo(up = false) {
//   mainMarginTop = collectionContainer.css('marginTop');
//   newMarginTop = parseInt(mainMarginTop) - 42;

//   if (debounce) {
//       return;
//   }

//   if (up) {
//       actual--;
//       newMarginTop = parseInt(mainMarginTop) + 42;
//   } else {
//       actual++;
//   }

//   if (actual < 0) {
//       actual = 0;
//       newMarginTop = 42;
//   }

//   debounce = true;

//   collectionContainer.animate({'marginTop': newMarginTop}, 150, function () {
//       debounce = false;
//   });

//   actualVideo = collection[actual];

//   if (actualVideo.isVideo && !actualVideo.validated) {
//       nexter.classList.add('start-video');
//   } else {
//       nexter.classList.remove('start-video');
//   }

//   changeTitle(actualVideo.buttonText);
// }

// /**
//  *
//  * @param {function} callback
//  */
// function save(callback) {

//   if (actualVideo.isVideo && !actualVideo.validated) {
//       actualVideo.buttonText = 'Modifier la description';

//       videoName = actualVideo.fileName;
//       oldPath = `${videoPath}Recording.mov`;
//       newPath = `${videoPath}${videoName}`;

//       fs.rename(oldPath, newPath, function () {
//           getTimeCode(newPath).then((timeOfVideo) => {
//               saveTheFile(callback);
//           });
//       });
//   } else {
//       actualVideo.buttonText = 'Modifier la description';
//       saveTheFile(callback);
//   }

//   changeTitle(actualVideo.buttonText);
// }

// /**
//  *
//  * @param {function} callback
//  */
// function saveTheFile(callback) {
//   workBook.toFileAsync(indexPath).then(() => {
//       callback();
//   });
// }

// // /**
// //  *
// //  */
// // function checkAllButtons() {
// //   activateButton = true;

// //   $('.chooser').each(function (index, element) {
// //       if (!$(element).hasClass('ok')) {
// //           activateButton = false;
// //       }
// //   });

// //   if (activateButton && methodForExercice) {
// //       activate();
// //       selectIndex.fadeOut();
// //   }
// // }


// /**
//  *
//  */
// function activate() {
//   starter.classList.add('activate');
// }

// /**
//  *
//  */
// function loadProject() {
//   allreadyLoaded = indexPath;
//   indexPath = indexPath ? indexPath : workField.offsetWidth;

//   if (!indexPath) {
//       return;
//   }

//   XlsxPopulate
//       .fromFileAsync(indexPath)
//       .then(workbook => {
//           workBook = workbook;
//           trainerSheet = workBook.sheet('Formateur');

//           if (!allreadyLoaded) {
//               injectProjectInformations();
//               preparePath();
//               loadSheet();
//           }
//       })
//   ;
// }

// /**
//  *
//  */
// function injectProjectInformations() {
//   projectNumber.text(projectNumberValue);
//   projectName.text(projectNameCell.value());
// }

// /**
//  *
//  */
// function preparePath() {
//   r = /[^\/]*$/;
//   projectPath = indexPath.replace(r, '');
//   exercicePath = `${projectPath}Fichiers_d_exercice/Chapitre_`;
//   videoPath = `${projectPath}Captures/`;
// }

// /**
//  *
//  */
// function loadSheet() {
//   videoNumberInChapter = 1;
//   numberOfChapterValue = 1;
//   first = true;

//   for (i = 11 ; i < 99 ; i++) {
//       titleCell = trainerSheet.cell(`C${i}`);
//       videoCell = trainerSheet.cell(`D${i}`);

//       if (!titleCell.value()) {
//           continue;
//       }

//       videoFormula = videoCell.formula();
//       pattern = /S/g;
//       isVideo = pattern.test(videoFormula);

//       object = {
//           name: titleCell.value(),
//           descriptionCell: `F${i}`,
//           isVideo: isVideo,
//           buttonText: 'Remplir la description'
//       };

//       if (isVideo) {
//           object = createVideoObject(object, numberOfChapterValue, videoNumberInChapter, i);

//           numberOfVideoValue++;
//           videoNumberInChapter++;
//       } else {
//           if (first) {
//               first = false;
//           } else {
//               numberOfChapterValue++;
//           }
//           videoNumberInChapter = 1;
//       }

//       collection.push(object);
//   }

//   numberOfChapter.text(`${numberOfChapterValue} chapitres`);
//   numberOfVideo.html(`${numberOfVideoValue} vid&eacute;os`);
// }

// /**
//  *
//  */
// function createVideoObject(object, numberOfChapterValue, videoNumberInChapter, i) {
//   cleanTitle = removeDiacritics(object.name).replace(/ |\'/g, '_').toLowerCase();
//   chapterNumber = numberOfChapterValue.pad();
//   videoNumber = videoNumberInChapter.pad();
//   videoTitle = `${projectNumberValue}_${chapterNumber}_${videoNumber}_${cleanTitle}`.substring(0, 30);

//   object.fileName = `${videoTitle}.mov`;
//   object.mountCell = `H${i}`;
//   object.timeCell = `E${i}`;
//   object.exercicePath = `${chapterNumber}/${videoNumber}`;
//   object.buttonText = 'Démarrer le record';

//   return object;
// }

// /**
//  *
//  */
// function handleExercices() {
//   exerciceDir = exerciceField.val();
//   path = `${exercicePath}${actualVideo.exercicePath}`;

//   mkdirp(path, function () {
//       zipFolder(exerciceDir, `${path}/exercices.zip`, () => {});
//   });
// }

// /**
//  *
//  * @param {String} recordingPath
//  */
// function getTimeCode(recordingPath) {
//   return getVideoInfo(recordingPath).then(function (info) {
//       cellRef = actualVideo.timeCell;
//       timeOfVideo = info.format.duration.toHHMMSS();

//       trainerSheet.cell(cellRef).value(timeOfVideo);
//       updateTotalTime(timeOfVideo);
//   });
// }

// /**
//  *
//  * @param {*} timeOfVideo
//  */
// function updateTotalTime(timeOfVideo) {
//   tc = timecode.init({framerate: '29.97', timecode: `${totalTime.text()}:00`});
//   tc.add(`${timeOfVideo}:00`);

//   time = tc.toString().substring(0, 8);

//   totalTime.text(time);
//   trainerSheet.cell(timeCell).value(time);
// }

// /**
//  *
//  */
// function startVideoRecord() {
//   robot.keyTap('&', ['command', 'shift']);
//   nexter.classList.remove('start-video');
//   stoper.classList.add('show');

//   changeTitle('Finaliser le record');
// }

// /**
//  *
//  */
// function stopVideoRecord(withRemove = false) {
//   robot.keyTap('d', ['command', 'shift']);

//   if (withRemove) {
//       filePath = `${videoPath}Recording.mov`;
//       stoper.classList.remove('show');

//       setTimeout(() => {
//           fs.unlink(filePath, function () {
//               changeTitle('Démarrer le record');
//               nexter.classList.add('start-video');
//           });
//       }, 1000);
//   }
// }

// /**
//  *
//  */
// function renameVideo(title) {
//   fs.rename(`${videoPath}Recording.mov`, `${videoPath}${title}.mov`);
// }
// }
