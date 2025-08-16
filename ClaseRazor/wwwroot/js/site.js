document.addEventListener("DOMContentLoaded", function () {
    // Sidebar toggle
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const mainWrapper = document.getElementById("mainWrapper");
    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("hidden");
        mainWrapper.classList.toggle("sidebar-hidden");
    });

    // Elementos To-Do
    const taskList = document.querySelector(".task-list");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const newTitle = document.getElementById("newTitle");
    const newDesc = document.getElementById("newDesc");
    const newDate = document.getElementById("newDate");

    // Agregar nueva tarea
    addTaskBtn.addEventListener("click", function () {
        if (!newTitle.value || !newDesc.value || !newDate.value) {
            alert("Completa todos los campos");
            return;
        }

        const li = document.createElement("li");
        li.className = "list-group-item task-item";
        li.dataset.status = "pending";
        li.innerHTML = `
            <div>
                <strong>${newTitle.value}</strong>
                <p>${newDesc.value}</p>
                <small>Vence: ${newDate.value}</small>
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-success complete-btn">✓</button>
                <button class="btn btn-sm btn-primary edit-btn">✎</button>
                <button class="btn btn-sm btn-danger delete-btn">🗑</button>
            </div>
        `;
        taskList.appendChild(li);

        newTitle.value = "";
        newDesc.value = "";
        newDate.value = "";
    });

    // Eventos en la lista (completar, editar, eliminar)
    taskList.addEventListener("click", function (e) {
        const taskItem = e.target.closest(".task-item");
        if (!taskItem) return;

        // Marcar completada
        if (e.target.classList.contains("complete-btn")) {
            if (taskItem.dataset.status === "pending") {
                taskItem.dataset.status = "completed";
                taskItem.classList.add("completed");
            } else {
                taskItem.dataset.status = "pending";
                taskItem.classList.remove("completed");
            }
        }

        // Editar tarea
        if (e.target.classList.contains("edit-btn")) {
            const title = prompt("Editar título:", taskItem.querySelector("strong").textContent);
            const desc = prompt("Editar descripción:", taskItem.querySelector("p").textContent);
            const date = prompt("Editar fecha de vencimiento:", taskItem.querySelector("small").textContent.replace("Vence: ", ""));
            if (title) taskItem.querySelector("strong").textContent = title;
            if (desc) taskItem.querySelector("p").textContent = desc;
            if (date) taskItem.querySelector("small").textContent = "Vence: " + date;
        }

        // Eliminar tarea
        if (e.target.classList.contains("delete-btn")) {
            if (confirm("¿Deseas eliminar esta tarea?")) {
                taskItem.remove();
            }
        }
    });

    // Filtrar tareas
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const filter = btn.dataset.filter;
            const tasks = document.querySelectorAll(".task-item");
            tasks.forEach(task => {
                if (filter === "all") task.style.display = "flex";
                else if (filter === "completed" && task.dataset.status === "completed") task.style.display = "flex";
                else if (filter === "pending" && task.dataset.status === "pending") task.style.display = "flex";
                else task.style.display = "none";
            });
        });
    });
});
