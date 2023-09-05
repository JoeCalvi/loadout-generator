<template>
    <div class="modal fade" id="activePerkModal" tabindex="-1" aria-labelledby="activePerkModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content bg-dark border-white">
        <slot></slot>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
</div>
</template>