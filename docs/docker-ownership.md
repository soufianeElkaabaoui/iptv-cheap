# Docker and workspace ownership

The initial inspection found an empty ext4 workspace in WSL2, owned by the
intended local account `soufiane` (actual UID/GID 1000:1000). The executing account
was verified against the project owner and passwd entry, rather than assumed.
Docker Desktop reported `seccomp` and `cgroupns`, without `rootless` or `userns`.
The bootstrap container's UID/GID maps were identity maps.

`./scripts/docker` refuses root execution, verifies the folder owner/group,
detects actual IDs with `id`, checks Docker security options, and pre-creates
`node_modules`, `.next`, `.next-build`, `.cache/npm`, and `.cache/home`. Compose
requires these exported LOCAL_UID/LOCAL_GID values and runs the application with
them. Bootstrap dependency installation used this same service and user.

The entire workspace is a bind mount with `create_host_path: false`. There are
no named volumes whose initial owner needs repairing. HOME and npm cache are in
pre-created local directories. Keep the project on the WSL filesystem for native
file watching and performance. Development hot reload uses Next's watcher;
WATCHPACK_POLLING is available for watcher compatibility.

`userns_mode: host` explicitly opts this service out of daemon user-namespace
remapping, so verified numeric IDs remain host IDs. If adding any direct
bootstrap `docker run`, it must use `--userns=host --user "$(id -u):$(id -g)"` and
these same pre-created directories/cache settings. Prefer the Compose launcher.
If namespaces cannot be disabled, stop and inspect the actual UID/GID maps;
never reuse the ordinary mapping blindly.

Rootless Docker maps container root to the daemon's user and other IDs to
subordinate host IDs. The launcher therefore refuses rootless mode before
writes. Supporting it requires verifying the daemon account, bind ownership,
and actual maps, then a dedicated mapping configuration and the same edit/delete
probe. Do not switch Docker contexts/modes without repeating ownership checks.

Run `./scripts/verify-ownership` while development is running. It creates a unique
file inside the actual development container, checks its WSL owner/group, edits
and removes it as the local account, and scans project files (including ignored
dependencies, caches, and build outputs) for mismatched owners. Repeat after
installs and builds. It removes only its own temporary file. No chmod 777, sudo
npm, blanket recursive chown, or Dockerfile COPY ownership workaround is used.
