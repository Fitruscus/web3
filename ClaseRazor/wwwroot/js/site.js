document.addEventListener("DOMContentLoaded", function () {
    const taskTableBody = document.getElementById("taskTableBody");

    taskTableBody.addEventListener("click", function (e) {
        const row = e.target.closest("tr");
        if (!row) return;

        // Marcar completada
        if (e.target.classList.contains("complete-btn")) {
            if (row.dataset.status === "pending") {
                row.dataset.status = "completed";
                row.classList.add("completed");
                row.cells[2].textContent = "Completada";
            } else {
                row.dataset.status = "pending";
                row.classList.remove("completed");
                row.cells[2].textContent = "Pendiente";
            }
        }

        // Editar
        if (e.target.classList.contains("edit-btn")) {
            const nombre = prompt("Editar nombre:", row.cells[0].textContent);
            const fecha = prompt("Editar fecha de vencimiento:", row.cells[1].textContent);
            if (nombre) row.cells[0].textContent = nombre;
            if (fecha) row.cells[1].textContent = fecha;
        }

        // Eliminar
        if (e.target.classList.contains("delete-btn")) {
            if (confirm("¿Deseas eliminar esta tarea?")) {
                row.remove();
            }
        }
    });
});
