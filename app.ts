import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

type ViewKey = 'overview' | 'profile' | 'cv' | 'portfolio' | 'public' | 'tasks' | 'projects' | 'calendar' | 'notes' | 'contacts';
type TaskStatus = 'En cours' | 'À faire' | 'Terminé';
type TaskPriority = 'Haute' | 'Moyenne' | 'Basse';

interface Task {
  id: number;
  title: string;
  project: string;
  due: string;
  status: TaskStatus;
  priority: TaskPriority;
  initials: string;
  color: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app-modern.scss',
})
export class App {
  protected readonly activeView = signal<ViewKey>('overview');
  protected readonly isMenuOpen = signal(false);
  protected readonly isQuickAddOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly taskFilter = signal<'Toutes' | TaskStatus>('Toutes');
  protected readonly toast = signal('');
  protected readonly newTaskTitle = signal('');
  protected readonly newTaskProject = signal('ShadowKite');
  protected readonly newTaskPriority = signal<TaskPriority>('Moyenne');
  protected readonly profileName = signal('Jean Mukendi');
  protected readonly profileTitle = signal('Développeur web & créateur de produits');
  protected readonly profileBio = signal('Je transforme des idées complexes en expériences simples et utiles.');
  protected readonly profileLocation = signal('Kinshasa, RDC');
  protected readonly profileSaved = signal(false);
  protected readonly cvSection = signal<'personal' | 'experience' | 'education' | 'skills'>('personal');

  protected readonly tasks = signal<Task[]>([
    { id: 1, title: 'Finaliser la page portfolio', project: 'Refonte du portfolio', due: "Aujourd'hui", status: 'En cours', priority: 'Haute', initials: 'AM', color: 'coral' },
    { id: 2, title: 'Préparer les visuels du lancement', project: 'Lancement produit', due: 'Demain', status: 'À faire', priority: 'Moyenne', initials: 'JM', color: 'violet' },
    { id: 3, title: 'Relire le brief client', project: 'Refonte du portfolio', due: '18 sept.', status: 'À faire', priority: 'Basse', initials: 'SK', color: 'blue' },
    { id: 4, title: 'Exporter le CV en PDF', project: 'Profil personnel', due: '16 sept.', status: 'Terminé', priority: 'Moyenne', initials: 'JM', color: 'gold' },
    { id: 5, title: 'Planifier la réunion de suivi', project: 'Lancement produit', due: '20 sept.', status: 'À faire', priority: 'Haute', initials: 'LM', color: 'green' },
  ]);

  protected readonly projects = [
    { name: 'Refonte du portfolio', type: 'Design · 8 tâches', progress: 74, color: 'yellow', members: 'AM', updated: 'Mis à jour il y a 2 h' },
    { name: 'Lancement produit', type: 'Marketing · 12 tâches', progress: 42, color: 'blue', members: 'JM', updated: 'Mis à jour hier' },
    { name: 'Profil personnel', type: 'Personnel · 5 tâches', progress: 90, color: 'pink', members: 'JM', updated: 'Mis à jour il y a 3 j' },
  ];

  protected readonly notes = [
    { title: 'Idées pour la page d’accueil', preview: 'Ajouter une section avec les projets récents et...', date: 'Aujourd’hui', color: 'yellow' },
    { title: 'Brief — Lancement produit', preview: 'Ton direct, visuel et accessible. Penser aux...', date: 'Hier', color: 'blue' },
    { title: 'À garder en tête', preview: 'La simplicité avant tout. Une interface claire...', date: '12 sept.', color: 'pink' },
  ];

  protected readonly filteredTasks = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const filter = this.taskFilter();
    return this.tasks().filter((task) => {
      const matchesQuery = !query || `${task.title} ${task.project} ${task.priority}`.toLowerCase().includes(query);
      const matchesFilter = filter === 'Toutes' || task.status === filter;
      return matchesQuery && matchesFilter;
    });
  });

  protected readonly completedCount = computed(() => this.tasks().filter((task) => task.status === 'Terminé').length);
  protected readonly inProgressCount = computed(() => this.tasks().filter((task) => task.status === 'En cours').length);
  protected readonly todoCount = computed(() => this.tasks().filter((task) => task.status === 'À faire').length);

  protected readonly viewMeta: Record<ViewKey, { label: string; title: string; description: string }> = {
    overview: { label: 'Vue d’ensemble', title: 'Bonjour, Jean', description: 'Voici ce qui se passe dans votre espace aujourd’hui.' },
    profile: { label: 'Mon profil', title: 'Construisez votre profil', description: 'Les informations qui vous présentent en quelques mots.' },
    cv: { label: 'Mon CV', title: 'Votre CV professionnel', description: 'Complétez votre parcours et prévisualisez le résultat.' },
    portfolio: { label: 'Portfolio', title: 'Vos projets', description: 'Présentez les réalisations dont vous êtes fier.' },
    public: { label: 'Page publique', title: 'Votre vitrine publique', description: 'Prévisualisez ce que vos visiteurs verront.' },
    tasks: { label: 'Mes tâches', title: 'Toutes vos tâches', description: 'Gardez le rythme, une étape après l’autre.' },
    projects: { label: 'Projets', title: 'Vos projets', description: 'Retrouvez chaque initiative au même endroit.' },
    calendar: { label: 'Calendrier', title: 'Votre semaine', description: 'Les rendez-vous et échéances à ne pas manquer.' },
    notes: { label: 'Notes', title: 'Vos idées', description: 'Capturez ce qui mérite de rester à portée de main.' },
    contacts: { label: 'Contacts', title: 'Votre réseau', description: 'Les personnes avec qui vous construisez la suite.' },
  };

  protected setView(view: ViewKey): void {
    this.activeView.set(view);
    this.isMenuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected openQuickAdd(): void {
    this.isQuickAddOpen.set(true);
    this.newTaskTitle.set('');
  }

  protected closeQuickAdd(): void {
    this.isQuickAddOpen.set(false);
  }

  protected addTask(): void {
    const title = this.newTaskTitle().trim();
    if (!title) return;
    const initials = this.newTaskProject() === 'Profil personnel' ? 'JM' : 'SK';
    this.tasks.update((tasks) => [
      {
        id: Date.now(),
        title,
        project: this.newTaskProject(),
        due: 'À planifier',
        status: 'À faire',
        priority: this.newTaskPriority(),
        initials,
        color: this.newTaskPriority() === 'Haute' ? 'coral' : 'blue',
      },
      ...tasks,
    ]);
    this.closeQuickAdd();
    this.showToast('Tâche ajoutée à votre espace');
  }

  protected cycleTaskStatus(id: number): void {
    this.tasks.update((tasks) => tasks.map((task) => {
      if (task.id !== id) return task;
      const nextStatus: TaskStatus = task.status === 'À faire' ? 'En cours' : task.status === 'En cours' ? 'Terminé' : 'À faire';
      return { ...task, status: nextStatus };
    }));
  }

  protected setFilter(filter: 'Toutes' | TaskStatus): void {
    this.taskFilter.set(filter);
  }

  protected saveProfile(): void {
    this.profileSaved.set(true);
    this.showToast('Profil enregistré dans votre espace');
    window.setTimeout(() => this.profileSaved.set(false), 2200);
  }

  protected showToast(message: string): void {
    this.toast.set(message);
    window.setTimeout(() => this.toast.set(''), 2400);
  }

  protected getStatusClass(status: TaskStatus): string {
    return status.toLowerCase().replace('à ', '').replace(' ', '-');
  }

  protected async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText('shadowkite.com/@jean-mukendi');
      this.showToast('Lien public copié');
    } catch {
      this.showToast('Lien public : shadowkite.com/@jean-mukendi');
    }
  }
}