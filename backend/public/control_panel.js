const API_URL = 'https://webrush-brasil-backend.onrender.com/api'; // Adjust to your backend port

// Utility Functions
function showLoading(tableId) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </td>
        </tr>
    `;
}

function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(alert, mainContent.firstChild);
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
    }, 5000);
}

function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(alert, mainContent.firstChild);
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
    }, 5000);
}

async function fetchWithErrorHandling(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'API Error');
        }
        return data;
    } catch (error) {
        showError(error.message);
        throw error;
    }
}

// Authentication Functions
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');
    const loginButton = document.querySelector('#login-section button');
    
    try {
        loginButton.disabled = true;
        loginButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
        
        const data = await fetchWithErrorHandling(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        localStorage.setItem('token', data.token);
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('control-panel').classList.remove('hidden');
        errorElement.textContent = '';
        loadDashboardData();
    } catch (error) {
        errorElement.textContent = error.message;
    } finally {
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
    }
}

function logout() {
    localStorage.removeItem('token');
    document.getElementById('control-panel').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
}

// Dashboard Functions
async function loadDashboardData() {
    const token = localStorage.getItem('token');
    try {
        const [blogs, projects, services] = await Promise.all([
            fetchWithErrorHandling(`${API_URL}/blog`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetchWithErrorHandling(`${API_URL}/portfolio`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetchWithErrorHandling(`${API_URL}/services`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        document.getElementById('blog-count').textContent = blogs.length;
        document.getElementById('project-count').textContent = projects.length;
        document.getElementById('service-count').textContent = services.length;

        const recentBlogsTable = document.getElementById('recent-blogs-table').getElementsByTagName('tbody')[0];
        recentBlogsTable.innerHTML = blogs.slice(0, 5).map(blog => `
            <tr>
                <td>${blog.title}</td>
                <td>${new Date(blog.created_at).toLocaleDateString()}</td>
            </tr>
        `).join('');

        const recentProjectsTable = document.getElementById('recent-projects-table').getElementsByTagName('tbody')[0];
        recentProjectsTable.innerHTML = projects.slice(0, 5).map(project => `
            <tr>
                <td>${project.title}</td>
                <td>${new Date(project.created_at).toLocaleDateString()}</td>
            </tr>
        `).join('');
    } catch (error) {
        showError('Failed to load dashboard data');
    }
}

// Blog Functions
async function loadBlogs() {
    const token = localStorage.getItem('token');
    showLoading('blogs-table');
    try {
        const blogs = await fetchWithErrorHandling(`${API_URL}/blog`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const blogsTable = document.getElementById('blogs-table').getElementsByTagName('tbody')[0];
        blogsTable.innerHTML = blogs.map(blog => `
            <tr>
                <td>${blog.id}</td>
                <td>${blog.title}</td>
                <td>${blog.slug}</td>
                <td>${new Date(blog.created_at).toLocaleDateString()}</td>
                <td>${blog.published ? 'Yes' : 'No'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="editBlog('${blog.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteBlog('${blog.id}', '${blog.title}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showError('Failed to load blogs');
    }
}

async function saveBlog() {
    const token = localStorage.getItem('token');
    const id = document.getElementById('blog-id').value;
    const blogData = {
        title: document.getElementById('blog-title').value,
        slug: document.getElementById('blog-slug').value,
        content: document.getElementById('blog-content').value,
        image_url: document.getElementById('blog-image').value,
        published: document.getElementById('blog-published').checked
    };
    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/blog/${id}` : `${API_URL}/blog`;
        await fetchWithErrorHandling(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(blogData)
        });
        bootstrap.Modal.getInstance(document.getElementById('blogModal')).hide();
        showSuccess(id ? 'Blog updated successfully' : 'Blog created successfully');
        loadBlogs();
        loadDashboardData();
    } catch (error) {
        showError(error.message);
    }
}

async function editBlog(id) {
    const token = localStorage.getItem('token');
    try {
        const blog = await fetchWithErrorHandling(`${API_URL}/blog/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        document.getElementById('blogModalTitle').textContent = 'Edit Blog';
        document.getElementById('blog-id').value = blog.id;
        document.getElementById('blog-title').value = blog.title;
        document.getElementById('blog-slug').value = blog.slug;
        document.getElementById('blog-content').value = blog.content;
        document.getElementById('blog-image').value = blog.image_url || '';
        document.getElementById('blog-published').checked = blog.published;
        new bootstrap.Modal(document.getElementById('blogModal')).show();
    } catch (error) {
        showError(error.message);
    }
}

// Project Functions
async function loadProjects() {
    const token = localStorage.getItem('token');
    showLoading('projects-table');
    try {
        const projects = await fetchWithErrorHandling(`${API_URL}/portfolio`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const projectsTable = document.getElementById('projects-table').getElementsByTagName('tbody')[0];
        projectsTable.innerHTML = projects.map(project => `
            <tr>
                <td>${project.id}</td>
                <td>${project.title}</td>
                <td>${project.project_url || 'N/A'}</td>
                <td>${new Date(project.created_at).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="editProject('${project.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProject('${project.id}', '${project.title}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showError('Failed to load projects');
    }
}

async function saveProject() {
    const token = localStorage.getItem('token');
    const id = document.getElementById('project-id').value;
    const projectData = {
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-description').value,
        image_url: document.getElementById('project-image').value,
        project_url: document.getElementById('project-url').value
    };
    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/portfolio/${id}` : `${API_URL}/portfolio`;
        await fetchWithErrorHandling(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(projectData)
        });
        bootstrap.Modal.getInstance(document.getElementById('projectModal')).hide();
        showSuccess(id ? 'Project updated successfully' : 'Project created successfully');
        loadProjects();
        loadDashboardData();
    } catch (error) {
        showError(error.message);
    }
}

async function editProject(id) {
    const token = localStorage.getItem('token');
    try {
        const project = await fetchWithErrorHandling(`${API_URL}/portfolio/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        document.getElementById('projectModalTitle').textContent = 'Edit Project';
        document.getElementById('project-id').value = project.id;
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-image').value = project.image_url || '';
        document.getElementById('project-url').value = project.project_url || '';
        new bootstrap.Modal(document.getElementById('projectModal')).show();
    } catch (error) {
        showError(error.message);
    }
}

// Service Functions
async function loadServices() {
    const token = localStorage.getItem('token');
    showLoading('services-table');
    try {
        const services = await fetchWithErrorHandling(`${API_URL}/services`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const servicesTable = document.getElementById('services-table').getElementsByTagName('tbody')[0];
        servicesTable.innerHTML = services.map(service => `
            <tr>
                <td>${service.id}</td>
                <td>${service.name}</td>
                <td>R$ ${service.price.toFixed(2)}</td>
                <td>${new Date(service.created_at).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="editService('${service.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteService('${service.id}', '${service.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showError('Failed to load services');
    }
}

async function saveService() {
    const token = localStorage.getItem('token');
    const id = document.getElementById('service-id').value;
    const serviceData = {
        name: document.getElementById('service-name').value,
        description: document.getElementById('service-description').value,
        price: parseFloat(document.getElementById('service-price').value)
    };
    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/services/${id}` : `${API_URL}/services`;
        await fetchWithErrorHandling(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData)
        });
        bootstrap.Modal.getInstance(document.getElementById('serviceModal')).hide();
        showSuccess(id ? 'Service updated successfully' : 'Service created successfully');
        loadServices();
        loadDashboardData();
    } catch (error) {
        showError(error.message);
    }
}

async function editService(id) {
    const token = localStorage.getItem('token');
    try {
        const service = await fetchWithErrorHandling(`${API_URL}/services/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        document.getElementById('serviceModalTitle').textContent = 'Edit Service';
        document.getElementById('service-id').value = service.id;
        document.getElementById('service-name').value = service.name;
        document.getElementById('service-description').value = service.description;
        document.getElementById('service-price').value = service.price;
        new bootstrap.Modal(document.getElementById('serviceModal')).show();
    } catch (error) {
        showError(error.message);
    }
}

// Delete Functions
function deleteBlog(id, title) {
    document.getElementById('deleteModalTitle').textContent = 'Delete Blog';
    document.getElementById('deleteModalText').textContent = `Are you sure you want to delete the blog "${title}"?`;
    document.getElementById('deleteItemId').value = id;
    document.getElementById('deleteItemType').value = 'blog';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function deleteProject(id, title) {
    document.getElementById('deleteModalTitle').textContent = 'Delete Project';
    document.getElementById('deleteModalText').textContent = `Are you sure you want to delete the project "${title}"?`;
    document.getElementById('deleteItemId').value = id;
    document.getElementById('deleteItemType').value = 'project';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function deleteService(id, name) {
    document.getElementById('deleteModalTitle').textContent = 'Delete Service';
    document.getElementById('deleteModalText').textContent = `Are you sure you want to delete the service "${name}"?`;
    document.getElementById('deleteItemId').value = id;
    document.getElementById('deleteItemType').value = 'service';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

async function confirmDelete() {
    const token = localStorage.getItem('token');
    const id = document.getElementById('deleteItemId').value;
    const type = document.getElementById('deleteItemType').value;
    let url, reloadFunction;
    switch (type) {
        case 'blog':
            url = `${API_URL}/blog/${id}`;
            reloadFunction = loadBlogs;
            break;
        case 'project':
            url = `${API_URL}/portfolio/${id}`;
            reloadFunction = loadProjects;
            break;
        case 'service':
            url = `${API_URL}/services/${id}`;
            reloadFunction = loadServices;
            break;
    }
    try {
        await fetchWithErrorHandling(url, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
        showSuccess('Item deleted successfully');
        reloadFunction();
        loadDashboardData();
    } catch (error) {
        showError(error.message);
    }
}

// Modal Preparation Functions
function prepareCreateBlog() {
    document.getElementById('blogModalTitle').textContent = 'Create New Blog';
    document.getElementById('blog-id').value = '';
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-slug').value = '';
    document.getElementById('blog-content').value = '';
    document.getElementById('blog-image').value = '';
    document.getElementById('blog-published').checked = true;
}

function prepareCreateProject() {
    document.getElementById('projectModalTitle').textContent = 'Create New Project';
    document.getElementById('project-id').value = '';
    document.getElementById('project-title').value = '';
    document.getElementById('project-description').value = '';
    document.getElementById('project-image').value = '';
    document.getElementById('project-url').value = '';
}

function prepareCreateService() {
    document.getElementById('serviceModalTitle').textContent = 'Create New Service';
    document.getElementById('service-id').value = '';
    document.getElementById('service-name').value = '';
    document.getElementById('service-description').value = '';
    document.getElementById('service-price').value = '';
}