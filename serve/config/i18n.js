const map = {
    "id": "ID",
    "name": "名称",
    "running_time": "运行时长",
    "recv_bytes": "网卡接收字节数",
    "recv_packets": "网卡接收网包数",
    "send_bytes": "网卡发送字节数",
    "send_packets": "网卡发送网包数",
    "drop_packets": "网卡丢弃网包数",
    "error_packets": "网卡错误网包数",
    "bit_per_second": "系统处理速度bps",
    "packet_per_second": "系统处理速度pps",
    "drop_bytes": "丢弃字节数",
    "drop_packets": "丢弃网包数",
    "current_packet_buffer_size": "当前网包缓冲区条目数",
    "peek_packet_buffer_size": "峰值网包缓冲区条目数",
    "session_alloc": "会话新建数",
    "session_free": "会话销毁数",
    "current_session_num": "当前会话数",
    "peek_session_num": "峰值会话数",
    "tcp_bytes": "TCP协议字节数",
    "tcp_packets": "TCP协议网包数",
    "tcp_session_alloc": "TCP协议会话新建数",
    "tcp_session_free": "TCP协议会话销毁数",
    "current_tcp_session_num": "当前TCP协议会话数",
    "peek_tcp_session_num": "峰值TCP协议会话数",
    "tcp_out_of_order_alloc": "TCP乱序出现数",
    "tcp_out_of_order_free": "TCP乱序恢复数",
    "current_tcp_out_of_order_num": "当前TCP乱序数",
    "peek_tcp_out_of_order_num": "峰值TCP乱序数",
    "udp_bytes": "UDP协议字节数",
    "udp_packets": "UDP协议网包数",
    "udp_session_alloc": "UDP协议会话新建数",
    "udp_session_free": "UDP协议会话销毁数",
    "current_udp_session_num": "当前UDP协议会话数",
    "peek_udp_session_num": "峰值UDP协议会话数",
    "icmp_bytes": "ICMP协议字节数",
    "icmp_packets": "ICMP协议网包数",
    "http_bytes": "HTTP协议字节数",
    "http_packets": "HTTP协议网包数",
    "http_session_alloc": "HTTP协议会话新建数",
    "http_session_free": "HTTP协议会话销毁数",
    "current_http_session_num": "当前HTTP协议会话数",
    "peek_http_session_num": "峰值HTTP协议会话数",
    "ssl_bytes": "SSL协议字节数",
    "ssl_packets": "SSL协议网包数",
    "ssl_session_alloc": "SSL协议会话新建数",
    "ssl_session_free": "SSL协议会话销毁数",
    "current_ssl_session_num": "当前SSL协议会话数",
    "peek_ssl_session_num": "峰值SSL协议会话数",
    "dns_bytes": "DNS协议字节数",
    "dns_packets": "DNS协议网包数",
    "dns_session_alloc": "DNS协议会话新建数",
    "dns_session_free": "DNS协议会话销毁数",
    "current_dns_session_num": "当前DNS协议会话数",
    "peek_dns_session_num": "峰值DNS协议会话数",
    "reconnect_num": "重连次数",
    "current_message_queue_size": "当前各消息队列条目数",
    "peek_message_queue_size": "峰值各消息队列条目数",
    "report_messages": "行为上报消息数",
    "report_bytes": "行为上报字节数",
    "drop_messages": "行为丢弃消息数",
    "drop_bytes": "行为丢弃字节数"
}

module.exports = key => map[key]