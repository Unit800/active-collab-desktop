'use strict';

const os            = require('os');
const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell         = electron.shell;
const appName       = app.getName();

function sendAction(action)
{
	const win = BrowserWindow.getAllWindows()[0];

	if (process.platform === 'darwin')
	{
		win.restore();

	}

	win.webContents.send(action);

}

const darwinTpl = [
{
	label: appName,
	submenu: [
		{
			label: `Über ${appName}`,
			role: 'about'
		},
		{
			type: 'separator'
		},
		{
			label: 'Präferenzen …',
			accelerator: 'Cmd+,',
			click: function() {
				sendAction('preferences');
			}
		},
		{
			label: 'Profil …',
			accelerator: 'Cmd+Alt+,',
			click: function() {
				sendAction('profile');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Dienste',
			role: 'services',
			submenu: []
		},
		{
			type: 'separator'
		},
		{
			label: `${appName} aublenden`,
			accelerator: 'Cmd+H',
			role: 'hide'
		},
		{
			label: 'Andere ausblenden',
			accelerator: 'Cmd+Shift+H',
			role: 'hideothers'
		},
		{
			label: 'Alle einblenden',
			role: 'unhide'
		},
		{
			type: 'separator'
		},
		{
			label: `${appName} beenden`,
			accelerator: 'Cmd+Q',
			click: function() {
				app.quit();
			}
		}
	]
},
{
	label: 'Ablage',
	submenu: [
		{
			label: 'Neues Projekt',
			accelerator: 'CmdOrCtrl+N',
			click: function() {
				sendAction('new-project');
			}
		},
		{
			label: 'Suchen …',
			accelerator: 'CmdOrCtrl+F',
			click: function() {
				sendAction('find');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Abmelden',
			click: function() {
				sendAction('logout');
			}
		}
	]
},
{
	label: 'Bearbeiten',
	submenu: [
		{
			label: 'Widerrufen',
			accelerator: 'CmdOrCtrl+Z',
			role: 'undo'
		},
		{
			label: 'Wiederholen',
			accelerator: 'Shift+CmdOrCtrl+Z',
			role: 'redo'
		},
		{
			type: 'separator'
		},
		{
			label: 'Ausschneiden',
			accelerator: 'CmdOrCtrl+X',
			role: 'cut'
		},
		{
			label: 'Kopieren',
			accelerator: 'CmdOrCtrl+C',
			role: 'copy'
		},
		{
			label: 'Einsetzen',
			accelerator: 'CmdOrCtrl+V',
			role: 'paste'
		},
		{
			label: 'Alles auswählen',
			accelerator: 'CmdOrCtrl+A',
			role: 'selectall'
		}
	]
},
{
	label: 'Darstellung',
	submenu: [
		{
			label: 'Projekte',
			accelerator: 'CmdOrCtrl+1',
			click: function() {
				sendAction('goto-projects');
			}
		},
		{
			label: 'Meine Arbeit',
			accelerator: 'CmdOrCtrl+2',
			click: function() {
				sendAction('goto-my-work');
			}
		},
		{
			label: 'Aktivität',
			accelerator: 'CmdOrCtrl+3',
			click: function() {
				sendAction('goto-activity');
			}
		},
		{
			label: 'Kalender',
			accelerator: 'CmdOrCtrl+4',
			click: function() {
				sendAction('goto-calendar');
			}
		},
		{
			label: 'Personen',
			accelerator: 'CmdOrCtrl+5',
			click: function() {
				sendAction('goto-people');
			}
		},
		{
			label: 'Rechnungen',
			accelerator: 'CmdOrCtrl+6',
			click: function() {
				sendAction('goto-invoices');
			}
		},
		{
			label: 'Schätzungen',
			accelerator: 'CmdOrCtrl+7',
			click: function() {
				sendAction('goto-estimates');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Berichte',
			accelerator: 'CmdOrCtrl+8',
			click: function() {
				sendAction('goto-reports');
			}
		},
		{
			label: 'Papierkorb',
			accelerator: 'CmdOrCtrl+9',
			click: function() {
				sendAction('goto-trash');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Abgeschlossene Projekte',
			accelerator: 'CmdOrCtrl+0',
			click: function() {
				sendAction('goto-completed-projects');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Seite neu laden',
			accelerator: 'CmdOrCtrl+R',
			click: function() {
				const win = BrowserWindow.getAllWindows()[0];
				win.webContents.reload();
			}
		}
	]
},
{
	label: 'Fenster',
	role: 'window',
	submenu: [
		{
			label: 'Im Dock ablegen',
			accelerator: 'CmdOrCtrl+M',
			role: 'minimize'
		},
		{
			label: 'Fenster schließen',
			accelerator: 'CmdOrCtrl+W',
			role: 'close'
		},
		{
			type: 'separator'
		},
		{
			label: 'Alle nach vorne bringen',
			role: 'front'
		},
		{
			label: 'Vollbildmodus',
			accelerator: 'Ctrl+Cmd+F',
			click: function() {
				const win = BrowserWindow.getAllWindows()[0];
				win.setFullScreen(!win.isFullScreen());
			}
		}
	]
},
{
	label: 'Hilfe',
	role: 'help'
}];

const linuxTpl = [
{
	label: 'File',
	submenu: [
		{
			label: 'New Project',
			accelerator: 'CmdOrCtrl+N',
			click: function() {
				sendAction('new-project');
			}
		},
		{
			label: 'Find ...',
			accelerator: 'CmdOrCtrl+F',
			click: function() {
				sendAction('find');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Log out',
			click: function() {
				sendAction('logout');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Quit',
			accelerator: 'Alt+F4',
			click: function() {
				app.quit();
			}
		}
	]
},
{
	label: 'Edit',
	submenu: [
		{
			label: 'Cut',
			accelerator: 'CmdOrCtrl+X',
			role: 'cut'
		},
		{
			label: 'Copy',
			accelerator: 'CmdOrCtrl+C',
			role: 'copy'
		},
		{
			label: 'Paste',
			accelerator: 'CmdOrCtrl+V',
			role: 'paste'
		},
		{
			type: 'separator'
		},
		{
			label: 'Preferences ...',
			accelerator: 'CmdOrCtrl+,',
			click: function() {
				sendAction('preferences');
			}
		},
		{
			label: 'User Profile ...',
			accelerator: 'CmdOrCtrl+Alt+,',
			click: function() {
				sendAction('profile');
			}
		}
	]
},
{
	label: 'View',
	submenu: [
		{
			label: 'Projects',
			accelerator: 'CmdOrCtrl+1',
			click: function() {
				sendAction('goto-projects');
			}
		},
		{
			label: 'My Work',
			accelerator: 'CmdOrCtrl+2',
			click: function() {
				sendAction('goto-my-work');
			}
		},
		{
			label: 'Activity',
			accelerator: 'CmdOrCtrl+3',
			click: function() {
				sendAction('goto-activity');
			}
		},
		{
			label: 'Calendar',
			accelerator: 'CmdOrCtrl+4',
			click: function() {
				sendAction('goto-calendar');
			}
		},
		{
			label: 'People',
			accelerator: 'CmdOrCtrl+5',
			click: function() {
				sendAction('goto-people');
			}
		},
		{
			label: 'Invoices',
			accelerator: 'CmdOrCtrl+6',
			click: function() {
				sendAction('goto-invoices');
			}
		},
		{
			label: 'Estimates',
			accelerator: 'CmdOrCtrl+7',
			click: function() {
				sendAction('goto-estimates');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Reports',
			accelerator: 'CmdOrCtrl+8',
			click: function() {
				sendAction('goto-reports');
			}
		},
		{
			label: 'Trash',
			accelerator: 'CmdOrCtrl+9',
			click: function() {
				sendAction('goto-trash');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Completed Projects',
			accelerator: 'CmdOrCtrl+0',
			click: function() {
				sendAction('goto-completed-projects');
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Reload',
			accelerator: 'CmdOrCtrl+R',
			click: function() {
				const win = BrowserWindow.getAllWindows()[0];
				win.webContents.reload();
			}
		}
	]
},
{
	label: 'Hilfe',
	role: 'help'
}];

const helpSubmenu = [
{
	label: `${appName} Webseite …`,
	click: function() {
		shell.openExternal('https://github.com/nurtext/active-collab-desktop');
	}
},
{
	label: 'Einen Fehler melden …',
	click: function() {
		const body = `
**Please succinctly describe your issue and steps to reproduce it.**

-

${app.getName()} ${app.getVersion()}
${process.platform} ${process.arch} ${os.release()}`;

		shell.openExternal(`https://github.com/nurtext/active-collab-desktop/issues/new?body=${encodeURIComponent(body)}`);
	}
},
{
	type: 'separator'
},
{
	label: 'Active Collab Timer herunterladen …',
	click: function() {
		shell.openExternal('https://www.activecollab.com/timer.html');
	}
}];

let tpl;

if (process.platform == 'darwin')
{
	tpl = darwinTpl;

}
else
{
	tpl = linuxTpl;

}

tpl[tpl.length - 1].submenu = helpSubmenu;

module.exports = electron.Menu.buildFromTemplate(tpl);
