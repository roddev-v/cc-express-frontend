import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ApiService } from "../../../shared/services/api/api.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {

  showTable = false;
  dataSource = new MatTableDataSource();

  displayColumns = ['id', 'longUrl', 'shortUrl'];

  addFormGroup = new FormGroup({
    url: new FormControl('', [Validators.required])
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: HTMLInputElement;

  constructor(
    private authService: AuthService,
    private api: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  onLogout(): void {
    this.authService.logout();
  }

  onAddForm(): void {
    this.showTable = false;
  }

  closeAddForm(): void {
    this.addFormGroup.reset();
    this.showTable = true;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyEventFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // TODO vezi aici sa adaugi o ruta de GET pe controller-ul de Urls
  // sa se numeasca /all
  async getData(): Promise<void> {
    this.showTable = false;
    const data = await this.api.getUrls();
    this.dataSource.data = data;
    this.showTable = true;
  }

  async redirect(shortUrl: string) {
    const data = await this.api.getRedirect(shortUrl);
    window.location.href = data;
  }

  async onAdd(): Promise<void> {
    try {
      await this.api.createUrl(this.addFormGroup.value.url);
      await this.getData();
      this.closeAddForm();
    } catch (e) {
      this.addFormGroup.setErrors({ any: true });
    }
  }

  ngOnDestroy() {
    this.addFormGroup.reset();
    this.showTable = true;
  }
}
