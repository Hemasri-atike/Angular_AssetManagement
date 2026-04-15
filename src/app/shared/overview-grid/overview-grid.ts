import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FilterService, SortService, GridComponent, VirtualScrollService, GridModule } from '@syncfusion/ej2-angular-grids';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { NgIf } from '@angular/common';
import { employeeData } from './data';

@Component({
  selector: 'app-overview-grid',
  standalone: true,
  imports: [GridModule, NgIf, RatingModule],
  providers: [FilterService, SortService],
  templateUrl: './overview-grid.html',
  styleUrls: ['./overview-grid.css']
})
export class OverviewGridComponent implements OnInit, AfterViewInit {

  public data: Object[] = [];
  public filterSettings!: Object;
  public selectionSettings!: Object;
  public loadingIndicator!: Object;
  public stTime: any;
  public dtTime: boolean = false;
  public isDataChanged: boolean = true;

  @ViewChild('overviewgrid') public gridInstance!: GridComponent;

  ngOnInit(): void {
    this.data = employeeData;
    this.filterSettings = { type: 'Menu' };
    this.loadingIndicator = { indicatorType: 'Shimmer' };
    this.stTime = performance.now();
    this.selectionSettings = {
      persistSelection: true,
      type: 'Multiple',
      checkboxOnly: true
    };
  }

  public softwareValue(args: any): number {
    if (args <= 20) {
      args = args + 30;
    }
    return args;
  }

  ngAfterViewInit(): void {
    this.gridInstance.on('data-ready', () => {});

    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(() => {
        if (this.stTime && this.isDataChanged) {
          let msgEle = document.getElementById('msg');
          if (msgEle) {
            let val: any = (performance.now() - this.stTime).toFixed(0);
            this.stTime = null;
            this.dtTime = false;
            this.isDataChanged = false;
            msgEle.innerHTML = 'Load Time: <b>' + val + '</b><b>ms</b>';
            msgEle.classList.remove('e-hide');
          }
        }
      });
    });

    const gridElement = document.getElementById('overviewgrid');
    if (gridElement) {
      observer.observe(gridElement, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  }

  onDataBound(args: any): void {
    this.dtTime = true;
  }
}