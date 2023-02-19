export class TabParts {
	parentNode: HTMLElement;
	tabs: NodeListOf<HTMLElement>;
	panels: NodeListOf<HTMLElement>;
	activeTabIndex: number;

	constructor(parentNode: HTMLElement) {
		this.parentNode = parentNode;
		this.tabs = this.parentNode.querySelectorAll('[role="tab"]');
		this.panels = this.parentNode.querySelectorAll('[role="tabpanel"]');

		this.activeTabIndex = 0;

		this.setAttrLoop();

		for(let i = 0; i < this.tabs.length; i++) {
			const tab = this.tabs[i];
			//全てのタブ要素をナンバリング（data-index属性にインデックス番号振り）
			tab.setAttribute('data-index', i.toString());

			// タブがクリックされた時の動作
			tab.addEventListener('click', (e) => {
				const target = e.target as HTMLElement;
				const dataIndex = target.getAttribute('data-index');
				if(dataIndex) {
					this.activeTabIndex = parseInt(dataIndex);
				}

				this.setAttrLoop();
			});

			// タブ上で矢印キー等が押された時の動作
			tab.addEventListener('keydown', (e) => {
				switch(e.key) {
					case 'ArrowLeft':
						if(!(this.activeTabIndex <= 0)) {
							this.activeTabIndex--;
						}
						break;
					case 'ArrowRight':
						if(!(this.activeTabIndex >= this.tabs.length - 1)) {
							this.activeTabIndex++;
						}
						break;
					default:
						break;
				}

				this.setAttrLoop();
				this.tabs[this.activeTabIndex].focus();
			})
		}
	}

	/**
	 * タブの[tabindex][stis-selected]属性の値をセットする。
	 * @param tab [role='tab']にあたるhtml要素
	 * @param activeTab 現在選択されているタブのhtml要素
	 */
	setTabAttr(tab: HTMLElement, activeTab: HTMLElement): void {
		const isActive = (): boolean => tab === activeTab;

		if(isActive()) {
			tab.tabIndex = 0;
			tab.ariaSelected = 'true';
		} else {
			tab.tabIndex = -1;
			tab.ariaSelected = 'false';
		}
	}

	/**
	 * パネルの[tabindex][stis-hidden]属性の値をセットする。
	 * @param panel [role='tabpanel']にあたるhtml要素
	 * @param activeTab 現在選択されているタブのhtml要素
	 */
	setPanelAttr(panel: HTMLElement, activeTab: HTMLElement): void {
		const controls = activeTab.getAttribute('aria-controls');

		panel.tabIndex = 0;

		if(panel.id === controls) {
			panel.ariaHidden = 'false';
		} else {
			panel.ariaHidden = 'true';
		}
	}

	/**
	 * このアプリ内の全てのタブ・パネル要素に対して属性を書き換える
	 */
	setAttrLoop(): void {
		for(let i = 0; i < this.tabs.length; i++) {
			this.setTabAttr(this.tabs[i], this.tabs[this.activeTabIndex]);
		}
		for(let i = 0; i < this.panels.length; i++) {
			this.setPanelAttr(this.panels[i], this.tabs[this.activeTabIndex]);
		}
	}
}
